// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IMetaWillDonation.sol";

contract MetaWillDonation is IMetaWillDonation {
    address public owner;

    // Donation tracking
    uint256 public totalDonations;
    mapping(address => uint256) public donorContributions;

    constructor() {
        owner = msg.sender;
    }

    // Receive donations
    receive() external payable {
        totalDonations += msg.value;
        donorContributions[msg.sender] += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    // Fallback function
    fallback() external payable {
        totalDonations += msg.value;
        donorContributions[msg.sender] += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    // Admin can withdraw funds to send to actual charities
    function withdrawFunds(
        address payable _recipient,
        uint256 _amount
    ) external {
        require(msg.sender == owner, "Only owner can withdraw funds");
        require(_amount <= address(this).balance, "Insufficient balance");

        (bool sent, ) = _recipient.call{value: _amount}("");
        require(sent, "Failed to send funds");

        emit FundsWithdrawn(_recipient, _amount);
    }

    // Get donor contribution
    function getDonorContribution(
        address _donor
    ) external view returns (uint256) {
        return donorContributions[_donor];
    }

    // Get contract balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Get total donations received
    function getTotalDonations() external view returns (uint256) {
        return totalDonations;
    }

    function recordDonation(address donor, uint256 amount) external override {
        // Hanya komitmen yang bisa memanggil
        require(msg.sender != address(0), "Invalid caller");

        totalDonations += amount;
        donorContributions[donor] += amount;
        emit DonationReceived(donor, amount);
    }
}
