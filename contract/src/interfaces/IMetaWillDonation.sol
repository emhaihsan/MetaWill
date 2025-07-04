// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title IMetaWillDonation
/// @notice Interface for the MetaWill donation contract that handles donation management
interface IMetaWillDonation {
    /// @notice Emitted when a donation is received
    /// @param donor Address of the donor
    /// @param amount Amount of ETH donated
    event DonationReceived(address indexed donor, uint256 amount);

    /// @notice Emitted when funds are withdrawn from the contract
    /// @param recipient Address receiving the withdrawn funds
    /// @param amount Amount of ETH withdrawn
    event FundsWithdrawn(address indexed recipient, uint256 amount);

    /// @notice Withdraws funds from the contract to a specified address
    /// @param recipient Address to receive the withdrawn funds
    /// @param amount Amount of ETH to withdraw
    function withdrawFunds(address payable recipient, uint256 amount) external;

    /// @notice Gets the total contribution from a specific donor
    /// @param donor Address of the donor
    /// @return Total amount donated by the specified donor
    function getDonorContribution(address donor) external view returns (uint256);

    /// @notice Gets the current balance of the donation contract
    /// @return Current balance in ETH
    function getBalance() external view returns (uint256);

    /// @notice Gets the total amount of donations received
    /// @return Total donations received in ETH
    function getTotalDonations() external view returns (uint256);

    /// @notice Records a donation from a donor
    /// @param donor Address of the donor
    /// @param amount Amount of ETH donated
    function recordDonation(address donor, uint256 amount) external;
}
