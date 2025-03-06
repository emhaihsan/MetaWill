// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/IPROMISEContract.sol";

contract IPROMISEContractTest is Test {
    IPROMISEContract public ipromise;
    
    // Test users
    address public owner;
    address public user1;
    address public user2;
    address public user3;
    address public charity1;
    address public charity2;
    
    // Event signatures
    event CommitmentCreated(
        uint256 indexed commitmentId,
        address indexed owner,
        string title,
        uint256 stake,
        uint256 deadline
    );
    
    event ValidatorAssigned(
        uint256 indexed commitmentId,
        address indexed validator
    );
    
    event ValidationSubmitted(
        uint256 indexed commitmentId,
        address indexed validator,
        bool approved
    );
    
    event CommitmentCompleted(
        uint256 indexed commitmentId,
        address indexed owner,
        uint256 stake
    );
    
    event CommitmentFailed(
        uint256 indexed commitmentId,
        address indexed owner,
        address indexed charity,
        uint256 stake
    );

    function setUp() public {
        // Initialize with test ETH balances
        owner = address(1);
        user1 = address(2);
        user2 = address(3);
        user3 = address(4);
        charity1 = address(5);
        charity2 = address(6);
        
        vm.deal(owner, 100 ether);
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);
        vm.deal(user3, 10 ether);
        
        // Deploy contract as owner
        vm.prank(owner);
        ipromise = new IPROMISEContract();
        
        // Add charities
        vm.prank(owner);
        ipromise.addCharity(charity1);
        
        vm.prank(owner);
        ipromise.addCharity(charity2);
    }
    
    function testCreateCommitment() public {
        vm.prank(user1);
        
        // Stake 1 ETH
        uint256 stakeAmount = 1 ether;
        
        // Set deadline to 30 days from now
        uint256 deadline = block.timestamp + 30 days;
        
        // Expect the commitment created event
        vm.expectEmit(true, true, false, true);
        emit CommitmentCreated(0, user1, "Learn Spanish", stakeAmount, deadline);
        
        // Create commitment
        ipromise.createCommitment{value: stakeAmount}(
            "Learn Spanish",
            "Complete B1 certification",
            deadline,
            charity1
        );
        
        // Check commitment details
        (
            uint256 id,
            address commitmentOwner,
            string memory title,
            string memory description,
            uint256 stake,
            uint256 commitment_deadline,
            address charityAddress,
            IPROMISEContract.CommitmentStatus status,
            address validator,
            bool hasValidated,
            bool approvedCompletion,
            uint256 createdAt
        ) = ipromise.getCommitment(0);
        
        assertEq(id, 0);
        assertEq(commitmentOwner, user1);
        assertEq(title, "Learn Spanish");
        assertEq(description, "Complete B1 certification");
        assertEq(stake, stakeAmount);
        assertEq(commitment_deadline, deadline);
        assertEq(charityAddress, charity1);
        assertEq(uint(status), uint(IPROMISEContract.CommitmentStatus.Active));
        assertEq(validator, address(0));
        assertEq(hasValidated, false);
        assertEq(approvedCompletion, false);
        assertEq(createdAt, block.timestamp);
        
        // Check user commitments
        uint256[] memory userCommitments = ipromise.getUserCommitments(user1);
        assertEq(userCommitments.length, 1);
        assertEq(userCommitments[0], 0);
    }
    
    function testAssignValidator() public {
        // Create commitment first
        vm.prank(user1);
        ipromise.createCommitment{value: 1 ether}(
            "Learn Spanish",
            "Complete B1 certification",
            block.timestamp + 30 days,
            charity1
        );
        
        // Assign validator
        vm.prank(user1);
        
        // Expect validator assigned event
        vm.expectEmit(true, true, false, true);
        emit ValidatorAssigned(0, user2);
        
        ipromise.assignValidator(0, user2);
        
        // Check commitment has the validator
        (
            ,,,,,,,, 
            address assignedValidator,
            bool hasValidated,
            bool approvedCompletion,
        ) = ipromise.getCommitment(0);
        
        assertEq(assignedValidator, user2);
        assertEq(hasValidated, false);
        assertEq(approvedCompletion, false);
        
        // Check validator commitments
        uint256[] memory validatorCommitments = ipromise.getUserValidationCommitments(user2);
        assertEq(validatorCommitments.length, 1);
        assertEq(validatorCommitments[0], 0);
    }
    
    function testValidateCommitmentSuccess() public {
        // Setup: Create commitment and assign validator
        vm.prank(user1);
        ipromise.createCommitment{value: 1 ether}(
            "Learn Spanish",
            "Complete B1 certification",
            block.timestamp + 30 days,
            charity1
        );
        
        vm.prank(user1);
        ipromise.assignValidator(0, user2);
        
        // Record balances before validation
        uint256 initialBalance = user1.balance;
        
        // Validator approves
        vm.prank(user2);
        vm.expectEmit(true, true, false, true);
        emit ValidationSubmitted(0, user2, true);
        
        // Expect completion event (99% of stake returned after 1% fee)
        vm.expectEmit(true, true, false, true);
        emit CommitmentCompleted(0, user1, 0.99 ether);
        
        ipromise.validateCommitment(0, true);
        
        // Check commitment status is completed
        (,,,,,,, IPROMISEContract.CommitmentStatus status,,,,) = ipromise.getCommitment(0);
        assertEq(uint(status), uint(IPROMISEContract.CommitmentStatus.Completed));
        
        // Check user received their stake back minus fee
        assertEq(user1.balance, initialBalance + 0.99 ether);
        
        // Check platform fee is retained in contract
        assertEq(address(ipromise).balance, 0.01 ether);
    }
    
    function testValidateCommitmentFail() public {
        // Setup: Create commitment and assign validator
        vm.prank(user1);
        ipromise.createCommitment{value: 1 ether}(
            "Learn Spanish",
            "Complete B1 certification",
            block.timestamp + 30 days,
            charity1
        );
        
        vm.prank(user1);
        ipromise.assignValidator(0, user2);
        
        // Record balances before validation
        uint256 initialCharityBalance = charity1.balance;
        
        // Validator rejects
        vm.prank(user2);
        
        // Expect failure event (99% to charity after 1% fee)
        vm.expectEmit(true, true, true, true);
        emit CommitmentFailed(0, user1, charity1, 0.99 ether);
        
        ipromise.validateCommitment(0, false);
        
        // Check commitment status is failed
        (,,,,,,, IPROMISEContract.CommitmentStatus status,,,,) = ipromise.getCommitment(0);
        assertEq(uint(status), uint(IPROMISEContract.CommitmentStatus.Failed));
        
        // Check charity received the stake minus fee
        assertEq(charity1.balance, initialCharityBalance + 0.99 ether);
        
        // Check platform fee is retained in contract
        assertEq(address(ipromise).balance, 0.01 ether);
    }
    
    function testCancelCommitment() public {
        // Create commitment
        vm.prank(user1);
        ipromise.createCommitment{value: 1 ether}(
            "Learn Spanish",
            "Complete B1 certification",
            block.timestamp + 30 days,
            charity1
        );
        
        // Record initial balance
        uint256 initialBalance = user1.balance;
        
        // Cancel commitment
        vm.prank(user1);
        ipromise.cancelCommitment(0);
        
        // Check commitment status is canceled
        (,,,,,,, IPROMISEContract.CommitmentStatus status,,,,) = ipromise.getCommitment(0);
        assertEq(uint(status), uint(IPROMISEContract.CommitmentStatus.Canceled));
        
        // Check user got back their full stake
        assertEq(user1.balance, initialBalance + 1 ether);
    }
    
    function testCannotCancelAfterValidatorAssigned() public {
        // Create commitment
        vm.prank(user1);
        ipromise.createCommitment{value: 1 ether}(
            "Learn Spanish",
            "Complete B1 certification",
            block.timestamp + 30 days,
            charity1
        );
        
        // Assign validator
        vm.prank(user1);
        ipromise.assignValidator(0, user2);
        
        // Try to cancel - should revert
        vm.prank(user1);
        vm.expectRevert("Cannot cancel: validator has been added");
        ipromise.cancelCommitment(0);
    }
    
    function testForceCompleteExpiredCommitment() public {
        // Create commitment
        vm.prank(user1);
        ipromise.createCommitment{value: 1 ether}(
            "Learn Spanish",
            "Complete B1 certification",
            block.timestamp + 30 days,
            charity1
        );
        
        // Assign validator
        vm.prank(user1);
        ipromise.assignValidator(0, user2);
        
        // Fast forward past deadline
        vm.warp(block.timestamp + 31 days);
        
        // Force complete the commitment
        vm.prank(user3);
        ipromise.forceCompleteExpiredCommitment(0);
        
        // Since validator hasn't validated, it should be marked as failed
        (,,,,,,, IPROMISEContract.CommitmentStatus status,,,,) = ipromise.getCommitment(0);
        assertEq(uint(status), uint(IPROMISEContract.CommitmentStatus.Failed));
    }
    
    function testWithdrawPlatformFees() public {
        // Create and complete a commitment to generate fees
        vm.prank(user1);
        ipromise.createCommitment{value: 1 ether}(
            "Learn Spanish",
            "Complete B1 certification",
            block.timestamp + 30 days,
            charity1
        );
        
        vm.prank(user1);
        ipromise.assignValidator(0, user2);
        
        // Validator approves
        vm.prank(user2);
        ipromise.validateCommitment(0, true);
        
        // Should have 0.01 ETH (1%) in fees
        assertEq(address(ipromise).balance, 0.01 ether);
        
        // Record owner balance
        uint256 initialOwnerBalance = owner.balance;
        
        // Withdraw fees
        vm.prank(owner);
        ipromise.withdrawPlatformFees();
        
        // Owner should have received the fees
        assertEq(owner.balance, initialOwnerBalance + 0.01 ether);
        
        // Contract should have zero balance
        assertEq(address(ipromise).balance, 0);
    }
    
    function testUpdatePlatformFee() public {
        // Update fee to 2%
        vm.prank(owner);
        ipromise.updatePlatformFee(200);
        
        // Check fee is updated
        assertEq(ipromise.getPlatformFeePercentage(), 200);
        
        // Create and complete a commitment to test the new fee
        vm.prank(user1);
        ipromise.createCommitment{value: 1 ether}(
            "Learn Spanish",
            "Complete B1 certification",
            block.timestamp + 30 days,
            charity1
        );
        
        vm.prank(user1);
        ipromise.assignValidator(0, user2);
        
        // Record initial balances
        uint256 initialUser1Balance = user1.balance;
        
        // Validator approves
        vm.prank(user2);
        ipromise.validateCommitment(0, true);
        
        // Check user got 98% back (2% fee)
        assertEq(user1.balance, initialUser1Balance + 0.98 ether);
        
        // Check platform fee is 2%
        assertEq(address(ipromise).balance, 0.02 ether);
    }
}
