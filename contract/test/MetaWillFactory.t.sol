pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MetaWillFactory.sol";
import "../src/MetaWillDonation.sol";
import "../src/MetaWillCommitment.sol";
import "openzeppelin/mocks/token/ERC20Mock.sol";

contract MetaWillFactoryTest is Test {
    MetaWillFactory public factory;
    MetaWillDonation public donation1;
    MetaWillDonation public donation2;
    ERC20Mock public usdc;

    address public owner = address(1);
    address public user1 = address(2);
    address public user2 = address(3);
    address public _validator = address(4);

    uint256 public minStake = 0.001 * 1e6; // USDC has 6 decimals
    uint256 public maxStake = 10 * 1e6;

    function setUp() public {
        vm.startPrank(owner);

        usdc = new ERC20Mock();

        address[] memory initialDonationAddresses = new address[](2);
        string[] memory initialDonationNames = new string[](2);

        donation1 = new MetaWillDonation(address(usdc));
        initialDonationAddresses[0] = address(donation1);
        initialDonationNames[0] = "Education For All Foundation";

        donation2 = new MetaWillDonation(address(usdc));
        initialDonationAddresses[1] = address(donation2);
        initialDonationNames[1] = "Climate Action Fund";

        factory = new MetaWillFactory(address(usdc), initialDonationAddresses, initialDonationNames, minStake, maxStake);

        vm.stopPrank();
    }

    function testCreateCommitmentWithDonationChoice() public {
        vm.startPrank(user1);
        uint256 stakeAmount = 0.5 * 1e6;
        usdc.mint(user1, stakeAmount);
        usdc.approve(address(factory), stakeAmount);

        string memory title = "Test Commitment";
        string memory description = "This is a test commitment";
        uint256 deadline = block.timestamp + 30 days;
        uint256 donationChoice = 1; // Select the second donation option

        address commitmentAddress =
            factory.createCommitment(title, description, deadline, _validator, donationChoice, stakeAmount);

        MetaWillCommitment commitment = MetaWillCommitment(commitmentAddress);
        assertEq(commitment.getDonationAddress(), address(donation2));

        vm.stopPrank();
    }

    function testFailCreateCommitmentWithInvalidDonationIndex() public {
        vm.startPrank(user1);
        uint256 stakeAmount = 0.5 * 1e6;
        usdc.mint(user1, stakeAmount);
        usdc.approve(address(factory), stakeAmount);

        string memory title = "Test Commitment";
        string memory description = "This is a test commitment";
        uint256 deadline = block.timestamp + 30 days;
        uint256 donationChoice = 2; // Invalid index (only 0 and 1 are valid)

        factory.createCommitment(title, description, deadline, _validator, donationChoice, stakeAmount);

        vm.stopPrank();
    }

    function testGetDonationAddresses() public view {
        (address[] memory addresses, string[] memory names) = factory.getDonationAddresses();

        assertEq(addresses.length, 2);
        assertEq(names.length, 2);
        assertEq(addresses[0], address(donation1));
        assertEq(addresses[1], address(donation2));
        assertEq(names[0], "Education For All Foundation");
        assertEq(names[1], "Climate Action Fund");
    }

    function testAddDonationAddress() public {
        vm.startPrank(owner);

        MetaWillDonation newDonationContract = new MetaWillDonation(address(usdc));
        address newDonation = address(newDonationContract);
        string memory newName = "New Charity";

        factory.addDonationAddress(newDonation, newName);

        (address[] memory addresses, string[] memory names) = factory.getDonationAddresses();

        assertEq(addresses.length, 3);
        assertEq(addresses[2], newDonation);
        assertEq(names[2], newName);

        vm.stopPrank();
    }

    function testRemoveDonationAddress() public {
        vm.startPrank(owner);

        MetaWillDonation newDonationContract = new MetaWillDonation(address(usdc));
        address newDonation = address(newDonationContract);
        string memory newName = "New Charity";
        factory.addDonationAddress(newDonation, newName);

        factory.removeDonationAddress(1);

        (address[] memory addresses, string[] memory names) = factory.getDonationAddresses();

        assertEq(addresses.length, 2);
        assertEq(addresses[0], address(donation1));
        assertEq(addresses[1], newDonation);

        vm.stopPrank();
    }

    function testGetUserCommitments() public {
        address user = address(1);
        uint256 stakeAmount = 0.01 * 1e6;
        vm.startPrank(user);
        usdc.mint(user, stakeAmount * 2);
        usdc.approve(address(factory), stakeAmount * 2);

        address commitment1 = factory.createCommitment("C1", "D1", block.timestamp + 1 days, _validator, 0, stakeAmount);
        address commitment2 = factory.createCommitment("C2", "D2", block.timestamp + 1 days, _validator, 1, stakeAmount);

        address[] memory userCommitments = factory.getUserCommitments(user);

        assertEq(userCommitments.length, 2);
        assertEq(userCommitments[0], commitment1);
        assertEq(userCommitments[1], commitment2);

        vm.stopPrank();
    }

    function testDonationAfterFailedCommitment() public {
        address creator = address(1);
        address _validator_local = address(2);
        uint256 stakeAmount = 0.5 * 1e6;

        vm.startPrank(creator);
        usdc.mint(creator, stakeAmount);
        usdc.approve(address(factory), stakeAmount);

        address commitmentAddress = factory.createCommitment(
            "Test Commitment", "Description", block.timestamp + 1 days, _validator_local, 0, stakeAmount
        );
        vm.stopPrank();

        MetaWillCommitment commitment = MetaWillCommitment(commitmentAddress);
        uint256 initialDonationBalance = usdc.balanceOf(address(donation1));

        vm.prank(creator);
        commitment.reportCompletion(false);
        uint256 finalDonationBalance = usdc.balanceOf(address(donation1));

        assertEq(finalDonationBalance - initialDonationBalance, stakeAmount);

        uint256 creatorContribution = donation1.getDonorContribution(creator);
        assertEq(creatorContribution, stakeAmount);
    }

    function testGetValidatorCommitments() public {
        address creator = address(1);
        address _validator_local = address(2);
        uint256 stakeAmount = 0.01 * 1e6;
        vm.startPrank(creator);
        usdc.mint(creator, stakeAmount * 2);
        usdc.approve(address(factory), stakeAmount * 2);

        address commitment1 =
            factory.createCommitment("C1", "D1", block.timestamp + 1 days, _validator_local, 0, stakeAmount);
        address commitment2 =
            factory.createCommitment("C2", "D2", block.timestamp + 1 days, _validator_local, 1, stakeAmount);

        address[] memory validatorCommitments = factory.getValidatorCommitments(_validator_local);

        assertEq(validatorCommitments.length, 2);
        assertEq(validatorCommitments[0], commitment1);
        assertEq(validatorCommitments[1], commitment2);
    }

    function testWithdrawDonationFunds() public {
        address creator = address(5);
        address _validator_local = address(2);
        uint256 stakeAmount = 0.5 * 1e6;

        vm.startPrank(creator);
        usdc.mint(creator, stakeAmount);
        usdc.approve(address(factory), stakeAmount);

        address commitmentAddress = factory.createCommitment(
            "Test Commitment", "Description", block.timestamp + 1 days, _validator_local, 0, stakeAmount
        );
        vm.stopPrank();

        MetaWillCommitment commitment = MetaWillCommitment(commitmentAddress);

        vm.prank(creator);
        commitment.reportCompletion(false);

        assertEq(usdc.balanceOf(address(donation1)), stakeAmount);
        assertEq(donation1.getDonorContribution(creator), stakeAmount);

        address recipient = address(6);
        uint256 initialRecipientBalance = usdc.balanceOf(recipient);

        vm.prank(owner);
        donation1.withdrawFunds(payable(recipient), stakeAmount);

        assertEq(usdc.balanceOf(address(donation1)), 0);
        assertEq(usdc.balanceOf(recipient), initialRecipientBalance + stakeAmount);
    }

    function testFailWithdrawDonationFundsNonOwner() public {
        address creator = address(5);
        address _validator_local = address(2);
        uint256 stakeAmount = 0.5 * 1e6;

        vm.startPrank(creator);
        usdc.mint(creator, stakeAmount);
        usdc.approve(address(factory), stakeAmount);

        address commitmentAddress = factory.createCommitment(
            "Test Commitment", "Description", block.timestamp + 1 days, _validator_local, 0, stakeAmount
        );
        vm.stopPrank();

        MetaWillCommitment commitment = MetaWillCommitment(commitmentAddress);

        vm.prank(creator);
        commitment.reportCompletion(false);

        assertEq(usdc.balanceOf(address(donation1)), stakeAmount);

        address recipient = address(6);

        vm.prank(user1);
        donation1.withdrawFunds(payable(recipient), stakeAmount);
    }

    function testFailWithdrawDonationFundsInsufficientBalance() public {
        address creator = address(5);
        address _validator_local = address(2);
        uint256 stakeAmount = 0.5 * 1e6;

        vm.startPrank(creator);
        usdc.mint(creator, stakeAmount);
        usdc.approve(address(factory), stakeAmount);

        address commitmentAddress = factory.createCommitment(
            "Test Commitment", "Description", block.timestamp + 1 days, _validator_local, 0, stakeAmount
        );
        vm.stopPrank();

        MetaWillCommitment commitment = MetaWillCommitment(commitmentAddress);

        vm.prank(creator);
        commitment.reportCompletion(false);

        assertEq(usdc.balanceOf(address(donation1)), stakeAmount);

        address recipient = address(6);

        vm.prank(owner);
        donation1.withdrawFunds(payable(recipient), stakeAmount + 1);
    }
}
