const should = require('chai').should();
const { BN,constants, expectEvent, expectRevert, time, singletons } = require('@openzeppelin/test-helpers');

const ERC20Token = artifacts.require('ERC20Token');
const ERC777Token = artifacts.require('ERC777Token');

contract('WrappedToken', ([owner, user, ...accounts]) => {

    let erc20Token, erc777Token;
    beforeEach('Deploy contracts', async () => {
        erc20Token = await ERC20Token.new({ from: owner });
        await singletons.ERC1820Registry(owner);
        erc777Token = await ERC777Token.new({ from: owner });
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
})