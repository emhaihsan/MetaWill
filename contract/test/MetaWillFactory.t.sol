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

    uint256 public minStake = 0.01 ether;
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

    function testGetDonationAddresses() public {
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
}
