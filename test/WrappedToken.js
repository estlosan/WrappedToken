const should = require('chai').should();
const { BN, constants, expectEvent, expectRevert, time, singletons } = require('@openzeppelin/test-helpers');
const msgErrors = require('./helpers/msgErrors');

const ERC20Token = artifacts.require('ERC20Token');
const ERC777Token = artifacts.require('ERC777Token');

const ONE_ETHER = new BN('1000000000000000000');

contract('WrappedToken', ([owner, user, ...accounts]) => {

    let erc20Token, erc777Token;
    beforeEach('Deploy contracts', async () => {
        erc20Token = await ERC20Token.new({ from: owner });
        await singletons.ERC1820Registry(owner);
        erc777Token = await ERC777Token.new(erc20Token.address, { from: owner });
    })
    describe('Deploy test', () => {
        it("Should deploy contract", async () => {
            const erc20Name = 'ERC20Token';
            const erc777Name = 'ERC777Token';
            (await erc20Token.name()).should.be.equal(erc20Name);
            (await erc777Token.name()).should.be.equal(erc777Name);
        })
    })
    describe('Set functions', () => {
    })
    describe('Wrap Token', () => {
        beforeEach(('Mint ERC20'), async() => {
            const amount = ONE_ETHER;
            await erc20Token.mint(owner, amount, { from: owner });
            await erc20Token.mint(user, amount, { from: owner });
        })
        it(('Should allow wrap token'), async() => {
            const depositAmount = ONE_ETHER;
            const ownerERC20Balance = await erc20Token.balanceOf(owner);
            const ownerERC777Balance = await erc777Token.balanceOf(owner);
            await erc20Token.approve(erc777Token.address, depositAmount, { from: owner });
            await erc777Token.deposit(depositAmount, { from: owner });
            (await erc20Token.balanceOf(owner)).should.be.bignumber.equal(ownerERC20Balance.sub(depositAmount));
            (await erc777Token.balanceOf(owner)).should.be.bignumber.equal(ownerERC777Balance.add(depositAmount));
        })
        it(('Should deny wrap tokens if amount > owner tokens'), async() => {
            const depositAmount = ONE_ETHER.mul(new BN('3'));
            await erc20Token.approve(erc777Token.address, depositAmount, { from: user });
            await expectRevert(
                erc777Token.deposit(depositAmount, { from: user }),
                msgErrors.transferAmount
            )
        })
    })
    describe(('Unwrap Token'), () => {
        beforeEach(('Mint ERC20'), async() => {
            const mintAmount = ONE_ETHER;
            const depositAmount = ONE_ETHER;
            await erc20Token.mint(owner, mintAmount, { from: owner });
            await erc20Token.mint(user, mintAmount, { from: owner });
            await erc20Token.approve(erc777Token.address, depositAmount, { from: owner });
            await erc777Token.deposit(depositAmount, { from: owner });
            await erc20Token.approve(erc777Token.address, depositAmount, { from: user });
            await erc777Token.deposit(depositAmount, { from: user })
        })
        it(('Should allow unwrap token'), async() => {
            const unwrapAmount = ONE_ETHER;
            const ownerERC20Balance = await erc20Token.balanceOf(owner);
            const ownerERC777Balance = await erc777Token.balanceOf(owner);
            await erc777Token.withdraw(unwrapAmount, { from: owner });
            (await erc20Token.balanceOf(owner)).should.be.bignumber.equal(ownerERC20Balance.add(unwrapAmount));
            (await erc777Token.balanceOf(owner)).should.be.bignumber.equal(ownerERC777Balance.sub(unwrapAmount));
        })
        it(('Should deny wrap tokens if amount > owner tokens'), async() => {
            const unwrapAmount = ONE_ETHER.mul(new BN('3'));
            await expectRevert(
                erc777Token.deposit(unwrapAmount, { from: user }),
                msgErrors.insuficientAllowance
            )
        })
    })
})