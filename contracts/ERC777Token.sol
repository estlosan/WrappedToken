// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ERC777Token is ERC777 {
    uint256 constant public maxSupply = 1000000000000000000000000000; // 1 thousand millions of tokens
    uint256 constant public preAssigned = 300000000000000000000000000; // 300 hundred millions of tokens

    event TokensWrapped(
        address indexed sender,
        uint amount
    );

    event TokensUnwrapped(
        address indexed sender,
        uint amount
    );

    IERC20 public tokenAddress;

    constructor (IERC20 _tokenAddress) ERC777("ERC777Token", "777", new address[](0)) {
        tokenAddress = _tokenAddress;
        _mint(msg.sender, preAssigned, "", "");
    }

    function deposit(uint amount) external {
        IERC20 token = tokenAddress;
        require(address(token) != address(0), "Token address not set");

        address sender = msg.sender;

        token.transferFrom(sender, address(this), amount);

        _mint(sender, amount, "", "");

        emit TokensWrapped(sender, amount);
    }

    function withdraw(uint amount) external {
        require(address(tokenAddress) != address(0), "Token address not set");
        
        address sender = msg.sender;

        burn(amount, "");

        (bool success, ) = address(tokenAddress).call(abi.encodeWithSignature("transfer(address,uint256)", sender, amount));
        require(success);

        emit TokensUnwrapped(sender, amount);
    }
}