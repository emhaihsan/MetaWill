// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MetaWillCommitment.sol";
import "../src/interfaces/IMetaWillCommitment.sol";
import "../src/interfaces/IMetaWillDonation.sol";
import "openzeppelin/mocks/token/ERC20Mock.sol";

// Mock untuk kontrak donasi
contract MockDonation is IMetaWillDonation {
    mapping(address => uint256) public donorContributions;
    uint256 public totalDonations;
    ERC20Mock public usdc;

    constructor(address _usdcAddress) {
        usdc = ERC20Mock(_usdcAddress);
    }

    function recordDonation(address donor, uint256 amount) external override {
        donorContributions[donor] += amount;
        totalDonations += amount;
        emit DonationReceived(donor, amount);
    }

    function withdrawFunds(address payable recepient, uint256 amount) external override {}

    function getDonorContribution(address donor) external view override returns (uint256) {
        return donorContributions[donor];
    }

    function getBalance() external view override returns (uint256) {
        return usdc.balanceOf(address(this));
    }

    function getTotalDonations() external view override returns (uint256) {
        return totalDonations;
    }
}

contract MetaWillCommitmentTest is Test {
    MetaWillCommitment public commitment;
    MockDonation public mockDonation;
    ERC20Mock public usdc;

    address public creator = address(1);
    address public validator = address(2);
    address public donationAddress;

    string public title = "Test Commitment";
    string public description = "This is a test commitment";
    uint256 public deadline;
    uint256 public stakeAmount = 0.5 * 1e6; // USDC has 6 decimals

    function setUp() public {
        deadline = block.timestamp + 30 days;

        // Deploy mock usdc contract
        usdc = new ERC20Mock();

        // Deploy mock donation contract
        mockDonation = new MockDonation(address(usdc));
        donationAddress = address(mockDonation);

        // Create commitment
        commitment = new MetaWillCommitment(
            address(usdc), creator, validator, title, description, deadline, stakeAmount, donationAddress
        );

        // Fund the commitment contract with mock USDC
        usdc.mint(address(commitment), stakeAmount);
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
        assertEq(uint256(_status), uint256(IMetaWillCommitment.CommitmentStatus.Active));
        assertEq(_creatorReportedSuccess, false);
        assertEq(_validatorConfirmed, false);
        assertEq(_validatorReportedOutcome, false);
    }

    function testCreatorReportSuccess() public {
        vm.prank(creator);
        commitment.reportCompletion(true);

        (,,,,,,, bool _creatorReportedSuccess,,) = commitment.getCommitmentDetails();
        assertEq(_creatorReportedSuccess, true);
    }

    function testCreatorReportFailure() public {
        // Catat saldo awal
        uint256 initialDonationBalance = usdc.balanceOf(donationAddress);

        vm.prank(creator);
        commitment.reportCompletion(false);

        (,,,,,, IMetaWillCommitment.CommitmentStatus _status,,,) = commitment.getCommitmentDetails();
        assertEq(uint256(_status), uint256(IMetaWillCommitment.CommitmentStatus.CompletedFailure));

        // Check that funds were sent to donation address
        assertEq(usdc.balanceOf(donationAddress) - initialDonationBalance, stakeAmount);

        // Verifikasi donasi tercatat
        assertEq(mockDonation.getDonorContribution(creator), stakeAmount);
    }

    function testValidatorConfirmSuccess() public {
        // Creator reports success
        vm.prank(creator);
        commitment.reportCompletion(true);

        // Catat saldo awal creator
        uint256 initialCreatorBalance = usdc.balanceOf(creator);

        // Validator confirms success
        vm.prank(validator);
        commitment.validateCompletion(true);

        (,,,,,, IMetaWillCommitment.CommitmentStatus _status,, bool _validatorConfirmed, bool _validatorReportedOutcome)
        = commitment.getCommitmentDetails();
        assertEq(uint256(_status), uint256(IMetaWillCommitment.CommitmentStatus.CompletedSuccess));
        assertEq(_validatorConfirmed, true);
        assertEq(_validatorReportedOutcome, true);

        // Check that funds were returned to creator
        assertEq(usdc.balanceOf(creator) - initialCreatorBalance, stakeAmount);
    }

    function testValidatorDisputeSuccess() public {
        // Catat saldo awal
        uint256 initialDonationBalance = usdc.balanceOf(donationAddress);

        // Creator reports success
        vm.prank(creator);
        commitment.reportCompletion(true);

        // Validator disputes (reports failure)
        vm.prank(validator);
        commitment.validateCompletion(false);

        (,,,,,, IMetaWillCommitment.CommitmentStatus _status,, bool _validatorConfirmed, bool _validatorReportedOutcome)
        = commitment.getCommitmentDetails();
        assertEq(uint256(_status), uint256(IMetaWillCommitment.CommitmentStatus.CompletedFailure));
        assertEq(_validatorConfirmed, true);
        assertEq(_validatorReportedOutcome, false);

        // Check that funds were sent to donation address
        assertEq(usdc.balanceOf(donationAddress) - initialDonationBalance, stakeAmount);

        // Verifikasi donasi tercatat
        assertEq(mockDonation.getDonorContribution(creator), stakeAmount);
    }

    function testResolveAfterDeadline() public {
        // Catat saldo awal
        uint256 initialDonationBalance = usdc.balanceOf(donationAddress);

        // Fast forward past deadline
        vm.warp(deadline + 1 days);

        // Anyone can call resolveAfterDeadline
        commitment.resolveAfterDeadline();

        (,,,,,, IMetaWillCommitment.CommitmentStatus _status,,,) = commitment.getCommitmentDetails();
        assertEq(uint256(_status), uint256(IMetaWillCommitment.CommitmentStatus.CompletedFailure));

        // Check that funds were sent to donation address
        assertEq(usdc.balanceOf(donationAddress) - initialDonationBalance, stakeAmount);

        // Verifikasi donasi tercatat
        assertEq(mockDonation.getDonorContribution(creator), stakeAmount);
    }

    // Test tambahan: validator melaporkan kegagalan langsung
    function testValidatorReportFailureImmediately() public {
        // Catat saldo awal
        uint256 initialDonationBalance = usdc.balanceOf(donationAddress);

        // Validator melaporkan kegagalan langsung
        vm.prank(validator);
        commitment.validateCompletion(false);

        (,,,,,, IMetaWillCommitment.CommitmentStatus _status,, bool _validatorConfirmed, bool _validatorReportedOutcome)
        = commitment.getCommitmentDetails();

        // Komitmen harus langsung gagal
        assertEq(uint256(_status), uint256(IMetaWillCommitment.CommitmentStatus.CompletedFailure));
        assertEq(_validatorConfirmed, true);
        assertEq(_validatorReportedOutcome, false);

        // Dana harus dikirim ke alamat donasi
        assertEq(usdc.balanceOf(donationAddress) - initialDonationBalance, stakeAmount);

        // Verifikasi donasi tercatat
        assertEq(mockDonation.getDonorContribution(creator), stakeAmount);
    }
}
