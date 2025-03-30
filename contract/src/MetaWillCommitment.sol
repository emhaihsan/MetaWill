// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IMetaWillCommitment.sol";
import "./interfaces/IMetaWillDonation.sol";

contract MetaWillCommitment is IMetaWillCommitment {
    // Commitment details
    address public creator;
    address public validator;
    string public title;
    string public description;
    uint256 public deadline;
    uint256 public stakeAmount;
    address public donationAddress;
    CommitmentStatus public status;

    // Validation tracking
    bool public creatorReportedSuccess;
    bool public validatorConfirmed;
    bool public validatorReportedSuccess;

    constructor(
        address _creator,
        address _validator,
        string memory _title,
        string memory _description,
        uint256 _deadline,
        address _donationAddress
    ) payable {
        creator = _creator;
        validator = _validator;
        title = _title;
        description = _description;
        deadline = _deadline;
        stakeAmount = msg.value;
        donationAddress = _donationAddress;
        status = CommitmentStatus.Active;
    }

    // Creator reports completion status
    function reportCompletion(bool _success) external {
        require(msg.sender == creator, "Only creator can report completion");
        require(
            status == CommitmentStatus.Active,
            "Commitment is no longer active"
        );

        creatorReportedSuccess = _success;
        emit StatusReported(creator, _success);

        // If creator reports failure, immediately resolve as failure
        if (!_success) {
            _resolveCommitment(false);
        }
    }

    // Validator confirms or disputes the completion
    function validateCompletion(bool _success) external {
        require(msg.sender == validator, "Only validator can validate");
        require(
            status == CommitmentStatus.Active,
            "Commitment is no longer active"
        );

        validatorConfirmed = true;
        validatorReportedSuccess = _success;
        emit StatusReported(validator, _success);

        // Jika validator melaporkan kegagalan, langsung selesaikan sebagai gagal
        if (!_success) {
            _resolveCommitment(false);
            return;
        }

        // Jika creator sudah melaporkan keberhasilan dan validator juga, selesaikan sebagai berhasil
        if (creatorReportedSuccess) {
            _resolveCommitment(true);
        }
        // Jika deadline sudah lewat, selesaikan berdasarkan laporan validator
        else if (block.timestamp > deadline) {
            _resolveCommitment(_success);
        }
        // Jika tidak, tunggu laporan creator
    }

    // Anyone can trigger resolution after deadline
    function resolveAfterDeadline() external {
        require(block.timestamp > deadline, "Deadline has not passed yet");
        require(
            status == CommitmentStatus.Active,
            "Commitment is no longer active"
        );

        // If validator has confirmed, use their judgment
        if (validatorConfirmed) {
            _resolveCommitment(validatorReportedSuccess);
        }
        // If creator has reported success but validator hasn't confirmed
        else if (creatorReportedSuccess) {
            // Default to failure if validator didn't confirm success
            _resolveCommitment(false);
        }
        // Neither has reported, default to failure
        else {
            _resolveCommitment(false);
        }
    }

    // Internal function to resolve the commitment
    function _resolveCommitment(bool _success) internal {
        if (_success) {
            status = CommitmentStatus.CompletedSuccess;
            // Return funds to creator
            (bool sent, ) = creator.call{value: stakeAmount}("");
            require(sent, "Failed to return funds");
            emit FundsReturned(creator, stakeAmount);
        } else {
            status = CommitmentStatus.CompletedFailure;
            // Send funds to donation address
            IMetaWillDonation(donationAddress).recordDonation(
                creator,
                stakeAmount
            );
            (bool sent, ) = donationAddress.call{value: stakeAmount}("");
            require(sent, "Failed to donate funds");
            emit FundsDonated(donationAddress, stakeAmount);
        }

        emit CommitmentResolved(status, stakeAmount);
    }

    // Get commitment details
    function getCommitmentDetails()
        external
        view
        returns (
            address _creator,
            address _validator,
            string memory _title,
            string memory _description,
            uint256 _deadline,
            uint256 _stakeAmount,
            CommitmentStatus _status,
            bool _creatorReportedSuccess,
            bool _validatorConfirmed,
            bool _validatorReportedSuccess
        )
    {
        return (
            creator,
            validator,
            title,
            description,
            deadline,
            stakeAmount,
            status,
            creatorReportedSuccess,
            validatorConfirmed,
            validatorReportedSuccess
        );
    }

    // Get donation address
    function getDonationAddress() external view returns (address) {
        return donationAddress;
    }
}
