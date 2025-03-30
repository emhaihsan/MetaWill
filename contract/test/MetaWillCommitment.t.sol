// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/MetaWillCommitment.sol";
import "../src/interfaces/IMetaWillCommitment.sol";

contract MetaWillCommitmentTest is Test {
    MetaWillCommitment public commitment;

    address public creator = address(1);
    address public validator = address(2);
    address public donationAddress = address(3);

    string public title = "Test Commitment";
    string public description = "This is a test commitment";
    uint256 public deadline;
    uint256 public stakeAmount = 0.5 ether;

    function setUp() public {
        deadline = block.timestamp + 30 days;

        vm.deal(address(this), stakeAmount);
        commitment = new MetaWillCommitment{value: stakeAmount}(
            creator,
            validator,
            title,
            description,
            deadline,
            donationAddress
        );
    }

    function testInitialState() public view {
        (
            address _creator,
            address _validator,
            string memory _title,
            string memory _description,
            uint256 _deadline,
            uint256 _stakedAmount,
            IMetaWillCommitment.CommitmentStatus _status,
            bool _creatorReportedSuccess,
            bool _validatorConfirmed,
            bool _validatorReportedOutcome
        ) = commitment.getCommitmentDetails();

        assertEq(_creator, creator);
        assertEq(_validator, validator);
        assertEq(_title, title);
        assertEq(_description, description);
        assertEq(_deadline, deadline);
        assertEq(_stakedAmount, stakeAmount);
        assertEq(
            uint(_status),
            uint(IMetaWillCommitment.CommitmentStatus.Active)
        );
        assertEq(_creatorReportedSuccess, false);
        assertEq(_validatorConfirmed, false);
        assertEq(_validatorReportedOutcome, false);
    }

    function testCreatorReportSuccess() public {
        vm.prank(creator);
        commitment.reportCompletion(true);

        (, , , , , , , bool _creatorReportedSuccess, , ) = commitment
            .getCommitmentDetails();
        assertEq(_creatorReportedSuccess, true);
    }

    function testCreatorReportFailure() public {
        vm.prank(creator);
        commitment.reportCompletion(false);

        (
            ,
            ,
            ,
            ,
            ,
            ,
            IMetaWillCommitment.CommitmentStatus _status,
            ,
            ,

        ) = commitment.getCommitmentDetails();
        assertEq(
            uint(_status),
            uint(IMetaWillCommitment.CommitmentStatus.CompletedFailure)
        );

        // Check that funds were sent to donation address
        assertEq(donationAddress.balance, stakeAmount);
    }

    function testValidatorConfirmSuccess() public {
        // Creator reports success
        vm.prank(creator);
        commitment.reportCompletion(true);

        // Validator confirms success
        vm.prank(validator);
        commitment.validateCompletion(true);

        (
            ,
            ,
            ,
            ,
            ,
            ,
            IMetaWillCommitment.CommitmentStatus _status,
            ,
            bool _validatorConfirmed,
            bool _validatorReportedOutcome
        ) = commitment.getCommitmentDetails();
        assertEq(
            uint(_status),
            uint(IMetaWillCommitment.CommitmentStatus.CompletedSuccess)
        );
        assertEq(_validatorConfirmed, true);
        assertEq(_validatorReportedOutcome, true);

        // Check that funds were returned to creator
        assertEq(creator.balance, stakeAmount);
    }

    function testValidatorDisputeSuccess() public {
        // Creator reports success
        vm.prank(creator);
        commitment.reportCompletion(true);

        // Validator disputes (reports failure)
        vm.prank(validator);
        commitment.validateCompletion(false);

        (
            ,
            ,
            ,
            ,
            ,
            ,
            IMetaWillCommitment.CommitmentStatus _status,
            ,
            bool _validatorConfirmed,
            bool _validatorReportedOutcome
        ) = commitment.getCommitmentDetails();
        assertEq(
            uint(_status),
            uint(IMetaWillCommitment.CommitmentStatus.CompletedFailure)
        );
        assertEq(_validatorConfirmed, true);
        assertEq(_validatorReportedOutcome, false);

        // Check that funds were sent to donation address
        assertEq(donationAddress.balance, stakeAmount);
    }

    function testResolveAfterDeadline() public {
        // Fast forward past deadline
        vm.warp(deadline + 1 days);

        // Anyone can call resolveAfterDeadline
        commitment.resolveAfterDeadline();

        (
            ,
            ,
            ,
            ,
            ,
            ,
            IMetaWillCommitment.CommitmentStatus _status,
            ,
            ,

        ) = commitment.getCommitmentDetails();
        assertEq(
            uint(_status),
            uint(IMetaWillCommitment.CommitmentStatus.CompletedFailure)
        );

        // Check that funds were sent to donation address
        assertEq(donationAddress.balance, stakeAmount);
    }
}
