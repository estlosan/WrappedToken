// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

contract ERC777Token is ERC777 {
    uint256 constant public maxSupply = 1000000000000000000000000000; // 1 thousand millions of tokens
    uint256 constant public preAssigned = 300000000000000000000000000; // 300 hundred millions of tokens

    constructor () ERC777("ERC777Token", "777", new address[](0)) {
        _mint(msg.sender, preAssigned, "", "");
    }
}