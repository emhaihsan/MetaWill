// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/MetaWillFactory.sol";
import "../src/MetaWillDonation.sol";
import "../src/MetaWillCommitment.sol";

contract MetaWillFactoryTest is Test {
    MetaWillFactory public factory;
    MetaWillDonation public donation1;
    MetaWillDonation public donation2;

    address public owner = address(1);
    address public user1 = address(2);
    address public user2 = address(3);
    address public validator = address(4);

    uint256 public minStake = 0.001 ether;
    uint256 public maxStake = 10 ether;

    function setUp() public {
        vm.startPrank(owner);

        // Create two initial donation addresses
        address[] memory initialDonationAddresses = new address[](2);
        string[] memory initialDonationNames = new string[](2);

        donation1 = new MetaWillDonation();
        initialDonationAddresses[0] = address(donation1);
        initialDonationNames[0] = "Education For All Foundation";

        donation2 = new MetaWillDonation();
        initialDonationAddresses[1] = address(donation2);
        initialDonationNames[1] = "Climate Action Fund";

        factory = new MetaWillFactory(
            initialDonationAddresses,
            initialDonationNames,
            minStake,
            maxStake
        );

        vm.stopPrank();
    }

    function testCreateCommitmentWithDonationChoice() public {
        vm.startPrank(user1);
        vm.deal(user1, 1 ether);

        string memory title = "Test Commitment";
        string memory description = "This is a test commitment";
        uint256 deadline = block.timestamp + 30 days;
        uint256 donationChoice = 1; // Select the second donation option

        address commitmentAddress = factory.createCommitment{value: 0.5 ether}(
            title,
            description,
            deadline,
            validator,
            donationChoice
        );

        MetaWillCommitment commitment = MetaWillCommitment(commitmentAddress);
        assertEq(commitment.getDonationAddress(), address(donation2));

        vm.stopPrank();
    }

    function testFailCreateCommitmentWithInvalidDonationIndex() public {
        vm.startPrank(user1);
        vm.deal(user1, 1 ether);

        string memory title = "Test Commitment";
        string memory description = "This is a test commitment";
        uint256 deadline = block.timestamp + 30 days;
        uint256 donationChoice = 2; // Invalid index (only 0 and 1 are valid)

        factory.createCommitment{value: 0.5 ether}(
            title,
            description,
            deadline,
            validator,
            donationChoice
        );

        vm.stopPrank();
    }

    function testGetDonationAddresses() public view {
        (address[] memory addresses, string[] memory names) = factory
            .getDonationAddresses();

        assertEq(addresses.length, 2);
        assertEq(names.length, 2);
        assertEq(addresses[0], address(donation1));
        assertEq(addresses[1], address(donation2));
        assertEq(names[0], "Education For All Foundation");
        assertEq(names[1], "Climate Action Fund");
    }

    function testAddDonationAddress() public {
        vm.startPrank(owner);

        address newDonation = address(5);
        string memory newName = "New Charity";

        factory.addDonationAddress(newDonation, newName);

        (address[] memory addresses, string[] memory names) = factory
            .getDonationAddresses();

        assertEq(addresses.length, 3);
        assertEq(addresses[2], newDonation);
        assertEq(names[2], newName);

        vm.stopPrank();
    }

    function testRemoveDonationAddress() public {
        vm.startPrank(owner);

        // First add a third donation address
        address newDonation = address(5);
        factory.addDonationAddress(newDonation, "New Charity");

        // Now remove the second donation address
        factory.removeDonationAddress(1);

        (address[] memory addresses, string[] memory names) = factory
            .getDonationAddresses();

        assertEq(addresses.length, 2);
        assertEq(addresses[0], address(donation1));
        assertEq(addresses[1], newDonation);

        vm.stopPrank();
    }

    // Tambahkan di MetaWillFactory.t.sol
    function testGetUserCommitments() public {
        // Setup
        address user = address(1);
        vm.startPrank(user);
        vm.deal(user, 1 ether); // Memberikan ETH ke user

        // Create multiple commitments
        address commitment1 = factory.createCommitment{value: 0.01 ether}(
            "Commitment 1",
            "Description 1",
            block.timestamp + 1 days,
            address(2),
            0
        );
        address commitment2 = factory.createCommitment{value: 0.01 ether}(
            "Commitment 2",
            "Description 2",
            block.timestamp + 1 days,
            address(2),
            0
        );

        // Get user commitments
        address[] memory userCommitments = factory.getUserCommitments(user);

        // Verify
        assertEq(userCommitments.length, 2);
        assertEq(userCommitments[0], commitment1);
        assertEq(userCommitments[1], commitment2);

        vm.stopPrank();
    }

    // Tambahkan di MetaWillDonation.t.sol
    function testDonationAfterFailedCommitment() public {
        // Setup
        address creator = address(1);
        address validator = address(2);
        uint256 stakeAmount = 0.5 ether;

        // Berikan ETH ke creator
        vm.deal(creator, 1 ether);

        // Buat komitmen dengan stake
        vm.prank(creator);
        address commitmentAddress = factory.createCommitment{
            value: stakeAmount
        }(
            "Test Commitment",
            "Description",
            block.timestamp + 1 days,
            validator,
            0 // Pilih donasi pertama
        );

        // Ambil instance komitmen
        MetaWillCommitment commitment = MetaWillCommitment(commitmentAddress);

        // Catat saldo awal donasi
        uint256 initialDonationBalance = address(donation1).balance;

        // Creator melaporkan kegagalan
        vm.prank(creator);
        commitment.reportCompletion(false); // false = gagal

        // Cek saldo akhir donasi (seharusnya bertambah sebesar stake)
        uint256 finalDonationBalance = address(donation1).balance;
        assertEq(finalDonationBalance - initialDonationBalance, stakeAmount);

        // Cek kontribusi donor
        uint256 creatorContribution = donation1.getDonorContribution(creator);
        assertEq(creatorContribution, stakeAmount);
    }

    // Tambahkan untuk validator commitments (setelah implementasi)
    function testGetValidatorCommitments() public {
        // Setup
        address creator = address(1);
        address validator = address(2);

        vm.startPrank(creator);
        vm.deal(creator, 1 ether);

        // Create commitments with the same validator
        address commitment1 = factory.createCommitment{value: 0.1 ether}(
            "Commitment 1",
            "Description 1",
            block.timestamp + 1 days,
            validator,
            0
        );
        address commitment2 = factory.createCommitment{value: 0.1 ether}(
            "Commitment 2",
            "Description 2",
            block.timestamp + 1 days,
            validator,
            0
        );

        vm.stopPrank();

        // Get validator commitments
        address[] memory validatorCommitments = factory.getValidatorCommitments(
            validator
        );

        // Verify
        assertEq(validatorCommitments.length, 2);
        assertEq(validatorCommitments[0], commitment1);
        assertEq(validatorCommitments[1], commitment2);
    }

    // Test untuk withdraw hasil donasi
    function testWithdrawDonationFunds() public {
        // Setup - donasi gagal dari commitment
        address creator = address(5);
        address validator = address(2);
        uint256 stakeAmount = 0.5 ether;

        // Berikan ETH ke creator
        vm.deal(creator, 1 ether);

        // Buat komitmen dengan stake
        vm.prank(creator);
        address commitmentAddress = factory.createCommitment{
            value: stakeAmount
        }(
            "Test Commitment",
            "Description",
            block.timestamp + 1 days,
            validator,
            0 // Pilih donasi pertama
        );

        // Ambil instance komitmen
        MetaWillCommitment commitment = MetaWillCommitment(commitmentAddress);

        // Creator melaporkan kegagalan
        vm.prank(creator);
        commitment.reportCompletion(false);

        // Verifikasi donasi telah diterima
        assertEq(donation1.getBalance(), stakeAmount);
        assertEq(donation1.getDonorContribution(creator), stakeAmount);

        // Setup penerima dana donasi
        address payable recipient = payable(address(6));
        uint256 initialRecipientBalance = recipient.balance;

        // Owner mencairkan dana donasi langsung dari kontrak donasi
        vm.prank(owner);
        donation1.withdrawFunds(recipient, stakeAmount);

        // Verifikasi dana telah dicairkan
        assertEq(donation1.getBalance(), 0);
        assertEq(recipient.balance, initialRecipientBalance + stakeAmount);
    }

    // Test untuk withdraw donasi dengan non-owner (harus gagal)
    function testFailWithdrawDonationFundsNonOwner() public {
        // Setup - donasi gagal dari commitment
        address creator = address(5);
        address validator = address(2);
        uint256 stakeAmount = 0.5 ether;

        // Berikan ETH ke creator
        vm.deal(creator, 1 ether);

        // Buat komitmen dengan stake
        vm.prank(creator);
        address commitmentAddress = factory.createCommitment{
            value: stakeAmount
        }(
            "Test Commitment",
            "Description",
            block.timestamp + 1 days,
            validator,
            0 // Pilih donasi pertama
        );

        // Ambil instance komitmen
        MetaWillCommitment commitment = MetaWillCommitment(commitmentAddress);

        // Creator melaporkan kegagalan
        vm.prank(creator);
        commitment.reportCompletion(false);

        // Verifikasi donasi telah diterima
        assertEq(donation1.getBalance(), stakeAmount);

        // Setup penerima dana donasi
        address payable recipient = payable(address(6));

        // Non-owner mencoba mencairkan dana donasi (harus gagal)
        vm.prank(user1);
        donation1.withdrawFunds(recipient, stakeAmount);
    }

    // Test untuk withdraw dengan jumlah yang melebihi saldo (harus gagal)
    function testFailWithdrawDonationFundsInsufficientBalance() public {
        // Setup - donasi gagal dari commitment
        address creator = address(5);
        address validator = address(2);
        uint256 stakeAmount = 0.5 ether;

        // Berikan ETH ke creator
        vm.deal(creator, 1 ether);

        // Buat komitmen dengan stake
        vm.prank(creator);
        address commitmentAddress = factory.createCommitment{
            value: stakeAmount
        }(
            "Test Commitment",
            "Description",
            block.timestamp + 1 days,
            validator,
            0 // Pilih donasi pertama
        );

        // Ambil instance komitmen
        MetaWillCommitment commitment = MetaWillCommitment(commitmentAddress);

        // Creator melaporkan kegagalan
        vm.prank(creator);
        commitment.reportCompletion(false);

        // Verifikasi donasi telah diterima
        assertEq(donation1.getBalance(), stakeAmount);

        // Setup penerima dana donasi
        address payable recipient = payable(address(6));

        // Owner mencoba mencairkan dana donasi dengan jumlah yang melebihi saldo (harus gagal)
        vm.prank(owner);
        donation1.withdrawFunds(recipient, stakeAmount + 1 ether);
    }
}
