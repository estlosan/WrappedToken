// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20, Ownable {
    uint256 constant public maxSupply = 1000000000000000000000000000; // 1 thousand millions of tokens
    uint256 constant public preAssigned = 300000000000000000000000000; // 300 hundred millions of tokens

    constructor() ERC20("ERC20Token", "20") {
        _mint(msg.sender, preAssigned);
    }

    function mint(address _to, uint256 _amount) external onlyOwner {
        require((totalSupply() + _amount) <= maxSupply, "ERC20Token. Mint amount exceeded");
        _mint(_to, _amount);
    }
}