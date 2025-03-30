// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/MetaWillCommitment.sol";
import "../src/interfaces/IMetaWillCommitment.sol";
import "../src/interfaces/IMetaWillDonation.sol";

// Mock untuk kontrak donasi
contract MockDonation is IMetaWillDonation {
    mapping(address => uint256) public donorContributions;
    uint256 public totalDonations;

    function recordDonation(address donor, uint256 amount) external override {
        donorContributions[donor] += amount;
        totalDonations += amount;
        emit DonationReceived(donor, amount);
    }

    function withdrawFunds(
        address payable recepient,
        uint256 amount
    ) external override {}

    function getDonorContribution(
        address donor
    ) external view override returns (uint256) {
        return donorContributions[donor];
    }

    function getBalance() external view override returns (uint256) {
        return address(this).balance;
    }

    function getTotalDonations() external view override returns (uint256) {
        return totalDonations;
    }

    // Fungsi untuk menerima ETH
    receive() external payable {}
}

contract MetaWillCommitmentTest is Test {
    MetaWillCommitment public commitment;
    MockDonation public mockDonation;

    address public creator = address(1);
    address public validator = address(2);
    address public donationAddress;

    string public title = "Test Commitment";
    string public description = "This is a test commitment";
    uint256 public deadline;
    uint256 public stakeAmount = 0.5 ether;

    function setUp() public {
        deadline = block.timestamp + 30 days;

        // Deploy mock donation contract
        mockDonation = new MockDonation();
        donationAddress = address(mockDonation);

        // Fund this contract
        vm.deal(address(this), stakeAmount);

        // Create commitment
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
        // Pastikan donationAddress memiliki kode (mock)
        assertTrue(
            donationAddress.code.length > 0,
            "Donation address should have code"
        );

        // Catat saldo awal
        uint256 initialDonationBalance = address(donationAddress).balance;

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
        assertEq(
            address(donationAddress).balance - initialDonationBalance,
            stakeAmount
        );

        // Verifikasi donasi tercatat
        assertEq(mockDonation.getDonorContribution(creator), stakeAmount);
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
        // Pastikan donationAddress memiliki kode (mock)
        assertTrue(
            donationAddress.code.length > 0,
            "Donation address should have code"
        );

        // Catat saldo awal
        uint256 initialDonationBalance = address(donationAddress).balance;

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
        assertEq(
            address(donationAddress).balance - initialDonationBalance,
            stakeAmount
        );

        // Verifikasi donasi tercatat
        assertEq(mockDonation.getDonorContribution(creator), stakeAmount);
    }

    function testResolveAfterDeadline() public {
        // Pastikan donationAddress memiliki kode (mock)
        assertTrue(
            donationAddress.code.length > 0,
            "Donation address should have code"
        );

        // Catat saldo awal
        uint256 initialDonationBalance = address(donationAddress).balance;

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
        assertEq(
            address(donationAddress).balance - initialDonationBalance,
            stakeAmount
        );

        // Verifikasi donasi tercatat
        assertEq(mockDonation.getDonorContribution(creator), stakeAmount);
    }

    // Test tambahan: validator melaporkan kegagalan langsung
    function testValidatorReportFailureImmediately() public {
        // Pastikan donationAddress memiliki kode (mock)
        assertTrue(
            donationAddress.code.length > 0,
            "Donation address should have code"
        );

        // Catat saldo awal
        uint256 initialDonationBalance = address(donationAddress).balance;

        // Validator melaporkan kegagalan langsung
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

        // Komitmen harus langsung gagal
        assertEq(
            uint(_status),
            uint(IMetaWillCommitment.CommitmentStatus.CompletedFailure)
        );
        assertEq(_validatorConfirmed, true);
        assertEq(_validatorReportedOutcome, false);

        // Dana harus dikirim ke alamat donasi
        assertEq(
            address(donationAddress).balance - initialDonationBalance,
            stakeAmount
        );

        // Verifikasi donasi tercatat
        assertEq(mockDonation.getDonorContribution(creator), stakeAmount);
    }
}
