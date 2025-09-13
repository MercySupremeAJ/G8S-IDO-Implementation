// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title IDO Sale Contract for G8ST
/// @notice Simple fixed-price IDO with per-wallet min/max, time window, and admin withdrawal
contract IDOSale is ReentrancyGuard {
    error SaleNotActive();
    error SaleEnded();
    error BelowMinimum();
    error AboveMaximum();
    error ExceedsAllocation();
    error NotAdmin();

    event Purchased(address indexed buyer, uint256 ethAmount, uint256 tokenAmount);
    event Withdrawn(address indexed to, uint256 amount);

    IERC20 public immutable token;
    address public immutable admin;
    address public immutable treasury;

    uint256 public immutable tokensPerEth; // number of tokens per 1 ETH (18 decimals)
    uint256 public immutable startTime;
    uint256 public immutable endTime;
    uint256 public immutable minContributionWei;
    uint256 public immutable maxContributionWei;
    uint256 public immutable saleAllocationTokens;

    uint256 public totalTokensSold;
    uint256 public totalEthRaised;
    mapping(address => uint256) public contributionOf;

    constructor(
        address token_,
        address admin_,
        address treasury_,
        uint256 tokensPerEth_,
        uint256 startTime_,
        uint256 endTime_,
        uint256 minContributionWei_,
        uint256 maxContributionWei_,
        uint256 saleAllocationTokens_
    ) {
        require(token_ != address(0) && admin_ != address(0) && treasury_ != address(0), "zero addr");
        require(startTime_ < endTime_, "times");
        token = IERC20(token_);
        admin = admin_;
        treasury = treasury_;
        tokensPerEth = tokensPerEth_;
        startTime = startTime_;
        endTime = endTime_;
        minContributionWei = minContributionWei_;
        maxContributionWei = maxContributionWei_;
        saleAllocationTokens = saleAllocationTokens_;
    }

    function isActive() public view returns (bool) {
        return block.timestamp >= startTime && block.timestamp <= endTime && remainingTokens() > 0;
    }

    function remainingTokens() public view returns (uint256) {
        return saleAllocationTokens - totalTokensSold;
    }

    function buy() external payable nonReentrant {
        if (block.timestamp < startTime) revert SaleNotActive();
        if (block.timestamp > endTime) revert SaleEnded();
        if (msg.value < minContributionWei) revert BelowMinimum();
        uint256 newContribution = contributionOf[msg.sender] + msg.value;
        if (newContribution > maxContributionWei) revert AboveMaximum();

        // Calculate tokens: msg.value (wei) * tokensPerEth / 1e18
        uint256 tokensToBuy = (msg.value * tokensPerEth) / 1e18;
        if (tokensToBuy == 0) revert BelowMinimum();
        if (tokensToBuy > remainingTokens()) revert ExceedsAllocation();

        contributionOf[msg.sender] = newContribution;
        totalEthRaised += msg.value;
        totalTokensSold += tokensToBuy;

        // Transfer tokens to buyer (assumes contract has allowance/balance of sale allocation)
        require(token.transfer(msg.sender, tokensToBuy), "token transfer failed");

        emit Purchased(msg.sender, msg.value, tokensToBuy);
    }

    function withdrawEth() external {
        if (msg.sender != admin) revert NotAdmin();
        if (block.timestamp <= endTime) revert SaleNotActive();
        uint256 bal = address(this).balance;
        (bool ok, ) = treasury.call{value: bal}("");
        require(ok, "eth transfer failed");
        emit Withdrawn(treasury, bal);
    }
}