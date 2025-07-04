// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title IMetaWillFactory
/// @notice Interface for the MetaWill factory contract that manages commitment creation and donation addresses
interface IMetaWillFactory {
    /// @notice Emitted when a new commitment is created
    /// @param user Address of the user creating the commitment
    /// @param commitmentAddress Address of the newly created commitment contract
    /// @param title Title of the commitment
    /// @param donationAddress The selected donation address for this commitment
    event CommitmentCreated(address indexed user, address commitmentAddress, string title, address donationAddress);

    /// @notice Creates a new commitment contract
    /// @param title Title of the commitment
    /// @param description Description of the commitment
    /// @param deadline Timestamp when the commitment expires
    /// @param validator Address of the validator who will verify the commitment
    /// @param donationAddressIndex Index of the donation address in the donation addresses array
    /// @param _stakeAmount The amount of USDC to stake for the commitment
    /// @return Address of the newly created commitment contract
    function createCommitment(
        string memory title,
        string memory description,
        uint256 deadline,
        address validator,
        uint256 donationAddressIndex,
        uint256 _stakeAmount
    ) external returns (address);

    /// @notice Gets all commitment addresses created by a specific user
    /// @param user Address of the user
    /// @return Array of commitment addresses created by the user
    function getUserCommitments(address user) external view returns (address[] memory);

    /// @notice Gets the total number of commitments created through this factory
    /// @return Total number of commitments
    function getTotalCommitments() external view returns (uint256);

    /// @notice Gets all available donation addresses and their names
    /// @return Array of donation addresses and array of their corresponding names
    function getDonationAddresses() external view returns (address[] memory, string[] memory);

    /// @notice Gets the count of available donation addresses
    /// @return Number of donation addresses
    function getDonationAddressCount() external view returns (uint256);

    /// @notice Adds a new donation address to the list
    /// @param newDonationAddress Address to be added as a donation option
    /// @param name Name or description of the donation address
    function addDonationAddress(address newDonationAddress, string memory name) external;

    /// @notice Removes a donation address from the list
    /// @param index Index of the donation address to remove
    function removeDonationAddress(uint256 index) external;

    /// @notice Updates the minimum and maximum stake limits for commitments
    /// @param newMinStake New minimum stake amount
    /// @param newMaxStake New maximum stake amount
    function updateStakeLimits(uint256 newMinStake, uint256 newMaxStake) external;
}
