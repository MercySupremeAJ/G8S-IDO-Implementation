// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title G8S University Token (G8ST)
/// @notice ERC-20 token with fixed 10,000,000 total supply minted at deploy to treasury
contract G8SToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 10_000_000 ether; // 18 decimals

    constructor(address initialTreasury)
        ERC20("G8S Token", "G8ST")
        Ownable(msg.sender)
    {
        require(initialTreasury != address(0), "Treasury required");
        _mint(initialTreasury, INITIAL_SUPPLY);
    }
}