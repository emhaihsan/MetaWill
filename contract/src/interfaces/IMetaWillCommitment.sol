// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title IMetaWillCommitment
/// @notice Interface for MetaWill commitment contracts that handle individual commitments
interface IMetaWillCommitment {
    /// @notice Enum representing the possible states of a commitment
    enum CommitmentStatus {
        Active, // Commitment is active and in progress
        CompletedSuccess, // Commitment was successfully completed
        CompletedFailure, // Commitment failed to be completed
        Disputed // There is a dispute between creator and validator
    }

    /// @notice Emitted when either creator or validator reports completion status
    /// @param reporter Address of the account reporting the status
    /// @param success Whether the commitment was reported as successful
    event StatusReported(address indexed reporter, bool success);

    /// @notice Emitted when a commitment is resolved to its final state
    /// @param status Final status of the commitment
    /// @param amount The amount of ETH that was staked
    event CommitmentResolved(CommitmentStatus status, uint256 amount);

    /// @notice Emitted when funds are returned to the creator
    /// @param recipient Address receiving the returned funds
    /// @param amount Amount of ETH returned
    event FundsReturned(address recipient, uint256 amount);

    /// @notice Emitted when funds are donated due to commitment failure
    /// @param donationAddress Address receiving the donation
    /// @param amount Amount of ETH donated
    event FundsDonated(address donationAddress, uint256 amount);

    /// @notice Allows the creator to report the completion status
    /// @param success Whether the creator believes they completed the commitment
    function reportCompletion(bool success) external;

    /// @notice Allows the validator to confirm or dispute the creator's report
    /// @param success Whether the validator confirms the commitment was completed
    function validateCompletion(bool success) external;

    /// @notice Resolves the commitment after deadline has passed
    function resolveAfterDeadline() external;

    /// @notice Gets all details about the commitment
    /// @return creator Address of the commitment creator
    /// @return validator Address of the designated validator
    /// @return title Title of the commitment
    /// @return description Detailed description of the commitment
    /// @return deadline Timestamp when the commitment expires
    /// @return stakeAmount Amount of ETH staked on this commitment
    /// @return status Current status of the commitment
    /// @return creatorReportedSuccess Whether the creator reported success
    /// @return validatorConfirmed Whether the validator has confirmed
    /// @return validatorReportedSuccess Whether the validator reported success
    function getCommitmentDetails()
        external
        view
        returns (
            address creator,
            address validator,
            string memory title,
            string memory description,
            uint256 deadline,
            uint256 stakeAmount,
            CommitmentStatus status,
            bool creatorReportedSuccess,
            bool validatorConfirmed,
            bool validatorReportedSuccess
        );

    /// @notice Gets the donation address for this commitment
    /// @return Address where funds will be sent if commitment fails
    function getDonationAddress() external view returns (address);
}
