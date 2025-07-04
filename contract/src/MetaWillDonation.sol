// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IMetaWillDonation.sol";
import "./interfaces/IERC20.sol";

contract MetaWillDonation is IMetaWillDonation {
    address public owner;
    IERC20 public usdcToken;

    // Donation tracking
    uint256 public totalDonations;
    mapping(address => uint256) public donorContributions;

    constructor(address _usdcTokenAddress) {
        owner = msg.sender;
        usdcToken = IERC20(_usdcTokenAddress);
    }

    // Admin can withdraw funds to send to actual charities
    function withdrawFunds(address payable _recipient, uint256 _amount) external override {
        require(msg.sender == owner, "Only owner can withdraw funds");
        require(_amount <= getBalance(), "Insufficient balance");

        bool success = usdcToken.transfer(_recipient, _amount);
        require(success, "Failed to send funds");

        emit FundsWithdrawn(_recipient, _amount);
    }

    // Get donor contribution
    function getDonorContribution(address _donor) external view override returns (uint256) {
        return donorContributions[_donor];
    }

    // Get contract balance in USDC
    function getBalance() public view override returns (uint256) {
        return usdcToken.balanceOf(address(this));
    }

    // Get total donations received
    function getTotalDonations() external view override returns (uint256) {
        return totalDonations;
    }

    function recordDonation(address donor, uint256 amount) external override {
        // This function is intended to be called by the Commitment contract
        // to record a donation after a failed commitment.
        // We can add a check to ensure only a valid commitment contract can call this.
        // For now, we'll keep it simple.
        totalDonations += amount;
        donorContributions[donor] += amount;
        emit DonationReceived(donor, amount);
    }
}
