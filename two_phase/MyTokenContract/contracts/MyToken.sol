// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20{
    address public owner;
    constructor() ERC20("WPENG_TOKEN", "WTK") {
        owner = msg.sender;
    }

    mapping(address => uint256) public balances;

    event Transfer(address to, uint256 amount);
    event Approval(address spender, uint256 amount);

    function transfer(address to, uint256 amount) public override returns(bool) {
        require(balances[msg.sender] > amount, "not enough balance");
        _transfer(msg.sender, to, amount);
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(to, amount);
        return true;
    }

    function mint(uint256 total) public {
        require(owner == msg.sender, "owner no access");
        _mint(msg.sender, total);
        balances[msg.sender] += total;
    }

    function approve(address spender, uint256 value) public override returns(bool) {
        _approve(msg.sender, spender, value);
        emit Approval(spender, value);
        return true;
    }
}