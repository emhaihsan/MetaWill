import { expect } from "chai";
import { ethers } from "hardhat";
import { IPROMISEContract } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("IPROMISEContract", function () {
  let ipromise: IPROMISEContract;
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  let user3: HardhatEthersSigner;
  let charity1: HardhatEthersSigner;
  let charity2: HardhatEthersSigner;

  const oneEther = ethers.parseEther("1.0");
  const twoWeeks = 14 * 24 * 60 * 60; // 2 weeks in seconds

  beforeEach(async function () {
    // Get signers
    [owner, user1, user2, user3, charity1, charity2] = await ethers.getSigners();

    // Deploy contract
    const IPROMISEContract = await ethers.getContractFactory("IPROMISEContract");
    ipromise = await IPROMISEContract.deploy();

    // Approve charities
    await ipromise.approveCharity(charity1.address);
    await ipromise.approveCharity(charity2.address);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await ipromise.getOwner()).to.equal(owner.address);
    });

    it("Should set the default platform fee to 5%", async function () {
      expect(await ipromise.getPlatformFeePercentage()).to.equal(500);
    });
  });

  describe("Charity Management", function () {
    it("Should approve a charity", async function () {
      const newCharity = user3.address;
      await ipromise.approveCharity(newCharity);
      expect(await ipromise.isCharityApproved(newCharity)).to.be.true;
    });

    it("Should remove a charity", async function () {
      await ipromise.removeCharity(charity1.address);
      expect(await ipromise.isCharityApproved(charity1.address)).to.be.false;
    });

    it("Should revert if non-owner tries to approve charity", async function () {
      await expect(
        ipromise.connect(user1).approveCharity(user3.address)
      ).to.be.revertedWith("Only owner can call this function");
    });
  });

  describe("Commitment Creation", function () {
    it("Should create a commitment", async function () {
      const deadline = Math.floor(Date.now() / 1000) + twoWeeks;
      
      await expect(
        ipromise.connect(user1).createCommitment(
          "Learn Spanish",
          "I will learn basic Spanish in 2 weeks",
          deadline,
          charity1.address,
          { value: oneEther }
        )
      ).to.emit(ipromise, "CommitmentCreated")
        .withArgs(1, user1.address, "Learn Spanish", oneEther, deadline);
      
      const userCommitments = await ipromise.getUserCommitments(user1.address);
      expect(userCommitments.length).to.equal(1);
      expect(userCommitments[0]).to.equal(1);
      
      const basicInfo = await ipromise.getCommitmentBasicInfo(1);
      expect(basicInfo.owner).to.equal(user1.address);
      expect(basicInfo.title).to.equal("Learn Spanish");
      expect(basicInfo.description).to.equal("I will learn basic Spanish in 2 weeks");
      expect(basicInfo.stake).to.equal(oneEther);
      expect(basicInfo.deadline).to.equal(deadline);
      expect(basicInfo.charityAddress).to.equal(charity1.address);
      
      const statusInfo = await ipromise.getCommitmentStatusInfo(1);
      expect(statusInfo.status).to.equal(0); // Active
      expect(statusInfo.validator).to.equal(ethers.ZeroAddress);
      expect(statusInfo.hasValidated).to.be.false;
      expect(statusInfo.approvedCompletion).to.be.false;
    });

    it("Should revert if charity is not approved", async function () {
      const deadline = Math.floor(Date.now() / 1000) + twoWeeks;
      
      await expect(
        ipromise.connect(user1).createCommitment(
          "Learn Spanish",
          "I will learn basic Spanish in 2 weeks",
          deadline,
          user3.address, // Not an approved charity
          { value: oneEther }
        )
      ).to.be.revertedWith("Charity address not approved");
    });
  });

  describe("Validator Assignment", function () {
    beforeEach(async function () {
      // Create a commitment for testing
      const deadline = Math.floor(Date.now() / 1000) + twoWeeks;
      await ipromise.connect(user1).createCommitment(
        "Learn Spanish",
        "I will learn basic Spanish in 2 weeks",
        deadline,
        charity1.address,
        { value: oneEther }
      );
    });

    it("Should assign a validator", async function () {
      await expect(
        ipromise.connect(user1).assignValidator(1, user2.address)
      ).to.emit(ipromise, "ValidatorAssigned")
        .withArgs(1, user2.address);
      
      const statusInfo = await ipromise.getCommitmentStatusInfo(1);
      expect(statusInfo.validator).to.equal(user2.address);
    });

    it("Should revert if non-owner tries to assign validator", async function () {
      await expect(
        ipromise.connect(user2).assignValidator(1, user3.address)
      ).to.be.revertedWith("Only commitment owner can call this function");
    });

    it("Should revert if trying to assign self as validator", async function () {
      await expect(
        ipromise.connect(user1).assignValidator(1, user1.address)
      ).to.be.revertedWith("Cannot assign self as validator");
    });
  });

  describe("Commitment Validation", function () {
    beforeEach(async function () {
      // Create a commitment and assign validator
      const deadline = Math.floor(Date.now() / 1000) + twoWeeks;
      await ipromise.connect(user1).createCommitment(
        "Learn Spanish",
        "I will learn basic Spanish in 2 weeks",
        deadline,
        charity1.address,
        { value: oneEther }
      );
      
      await ipromise.connect(user1).assignValidator(1, user2.address);
    });

    it("Should validate commitment as successful", async function () {
      const initialBalance = await ethers.provider.getBalance(user1.address);
      
      await expect(
        ipromise.connect(user2).validateCommitment(1, true)
      ).to.emit(ipromise, "ValidationSubmitted")
        .withArgs(1, user2.address, true)
        .and.to.emit(ipromise, "CommitmentCompleted");
      
      const statusInfo = await ipromise.getCommitmentStatusInfo(1);
      expect(statusInfo.status).to.equal(1); // Completed
      expect(statusInfo.hasValidated).to.be.true;
      expect(statusInfo.approvedCompletion).to.be.true;
      
      // Check that user received funds back minus fee
      const finalBalance = await ethers.provider.getBalance(user1.address);
      const expectedReturn = oneEther * 95n / 100n; // 95% of stake (5% fee)
      
      // Allow for some gas cost difference
      expect(finalBalance - initialBalance).to.be.closeTo(expectedReturn, ethers.parseEther("0.01"));
    });

    it("Should validate commitment as failed", async function () {
      const initialBalance = await ethers.provider.getBalance(charity1.address);
      
      await expect(
        ipromise.connect(user2).validateCommitment(1, false)
      ).to.emit(ipromise, "ValidationSubmitted")
        .withArgs(1, user2.address, false)
        .and.to.emit(ipromise, "CommitmentFailed");
      
      const statusInfo = await ipromise.getCommitmentStatusInfo(1);
      expect(statusInfo.status).to.equal(2); // Failed
      expect(statusInfo.hasValidated).to.be.true;
      expect(statusInfo.approvedCompletion).to.be.false;
      
      // Check that charity received funds minus fee
      const finalBalance = await ethers.provider.getBalance(charity1.address);
      const expectedDonation = oneEther * 95n / 100n; // 95% of stake (5% fee)
      
      expect(finalBalance - initialBalance).to.equal(expectedDonation);
    });

    it("Should revert if non-validator tries to validate", async function () {
      await expect(
        ipromise.connect(user3).validateCommitment(1, true)
      ).to.be.revertedWith("Only assigned validator can call this function");
    });
  });

  describe("Commitment Cancellation", function () {
    beforeEach(async function () {
      // Create a commitment for testing
      const deadline = Math.floor(Date.now() / 1000) + twoWeeks;
      await ipromise.connect(user1).createCommitment(
        "Learn Spanish",
        "I will learn basic Spanish in 2 weeks",
        deadline,
        charity1.address,
        { value: oneEther }
      );
    });

    it("Should cancel a commitment", async function () {
      const initialBalance = await ethers.provider.getBalance(user1.address);
      
      await expect(
        ipromise.connect(user1).cancelCommitment(1)
      ).to.emit(ipromise, "CommitmentCanceled")
        .withArgs(1, user1.address);
      
      const statusInfo = await ipromise.getCommitmentStatusInfo(1);
      expect(statusInfo.status).to.equal(3); // Canceled
      
      // Check that user received full funds back
      const finalBalance = await ethers.provider.getBalance(user1.address);
      
      // Allow for some gas cost difference
      expect(finalBalance - initialBalance).to.be.closeTo(oneEther, ethers.parseEther("0.01"));
    });

    it("Should revert cancellation if validator is assigned", async function () {
      await ipromise.connect(user1).assignValidator(1, user2.address);
      
      await expect(
        ipromise.connect(user1).cancelCommitment(1)
      ).to.be.revertedWith("Cannot cancel: validator has been added");
    });
  });

  describe("Force Complete Expired Commitment", function () {
    it("Should force complete expired commitment with validator", async function () {
      // Create commitment with future deadline
      const blockNumBefore = await ethers.provider.getBlockNumber();
      const blockBefore = await ethers.provider.getBlock(blockNumBefore);
      const currentTimestamp = blockBefore!.timestamp;
      const deadline = currentTimestamp + 100; // 100 seconds in the future
      
      await ipromise.connect(user1).createCommitment(
        "Quick Task",
        "This will expire quickly",
        deadline,
        charity1.address,
        { value: oneEther }
      );
      
      // Assign validator
      await ipromise.connect(user1).assignValidator(1, user2.address);
      
      // Fast forward time to after deadline
      await ethers.provider.send("evm_increaseTime", [101]);
      await ethers.provider.send("evm_mine", []);
      
      const initialBalance = await ethers.provider.getBalance(user1.address);
      
      // Force complete
      await expect(
        ipromise.connect(user3).forceCompleteExpiredCommitment(1)
      ).to.emit(ipromise, "CommitmentCompleted");
      
      const statusInfo = await ipromise.getCommitmentStatusInfo(1);
      expect(statusInfo.status).to.equal(1); // Completed
      expect(statusInfo.hasValidated).to.be.true;
      expect(statusInfo.approvedCompletion).to.be.true;
      
      // Check that user received funds back minus fee
      const finalBalance = await ethers.provider.getBalance(user1.address);
      const expectedReturn = oneEther * 95n / 100n; // 95% of stake (5% fee)
      
      // Allow for some gas cost difference
      expect(finalBalance - initialBalance).to.be.closeTo(expectedReturn, ethers.parseEther("0.01"));
    });

    it("Should force complete expired commitment without validator as failed", async function () {
      // Create commitment with future deadline
      const blockNumBefore = await ethers.provider.getBlockNumber();
      const blockBefore = await ethers.provider.getBlock(blockNumBefore);
      const currentTimestamp = blockBefore!.timestamp;
      const deadline = currentTimestamp + 100; // 100 seconds in the future
      
      await ipromise.connect(user1).createCommitment(
        "Quick Task",
        "This will expire quickly",
        deadline,
        charity1.address,
        { value: oneEther }
      );
      
      // Fast forward time to after deadline
      await ethers.provider.send("evm_increaseTime", [101]);
      await ethers.provider.send("evm_mine", []);
      
      const initialBalance = await ethers.provider.getBalance(charity1.address);
      
      // Force complete
      await expect(
        ipromise.connect(user3).forceCompleteExpiredCommitment(1)
      ).to.emit(ipromise, "CommitmentFailed");
      
      const statusInfo = await ipromise.getCommitmentStatusInfo(1);
      expect(statusInfo.status).to.equal(2); // Failed
      expect(statusInfo.hasValidated).to.be.true;
      expect(statusInfo.approvedCompletion).to.be.false;
      
      // Check that charity received funds minus fee
      const finalBalance = await ethers.provider.getBalance(charity1.address);
      const expectedDonation = oneEther * 95n / 100n; // 95% of stake (5% fee)
      
      expect(finalBalance - initialBalance).to.equal(expectedDonation);
    });
  });

  describe("Platform Fee Management", function () {
    it("Should update platform fee", async function () {
      await ipromise.updatePlatformFee(300); // 3%
      expect(await ipromise.getPlatformFeePercentage()).to.equal(300);
    });

    it("Should revert if fee is too high", async function () {
      await expect(
        ipromise.updatePlatformFee(1100) // 11%
      ).to.be.revertedWith("Fee cannot exceed 10%");
    });

    it("Should withdraw platform fees", async function () {
      // Create and validate a commitment to generate fees
      const deadline = Math.floor(Date.now() / 1000) + twoWeeks;
      await ipromise.connect(user1).createCommitment(
        "Learn Spanish",
        "I will learn basic Spanish in 2 weeks",
        deadline,
        charity1.address,
        { value: oneEther }
      );
      
      await ipromise.connect(user1).assignValidator(1, user2.address);
      await ipromise.connect(user2).validateCommitment(1, true);
      
      // Check contract balance (should have 5% fee)
      const contractBalance = await ethers.provider.getBalance(await ipromise.getAddress());
      expect(contractBalance).to.equal(oneEther * 5n / 100n);
      
      // Withdraw fees
      const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
      await ipromise.withdrawPlatformFees();
      
      // Check owner received fees
      const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
      
      // Allow for some gas cost difference
      expect(finalOwnerBalance - initialOwnerBalance).to.be.closeTo(
        oneEther * 5n / 100n, 
        ethers.parseEther("0.01")
      );
      
      // Contract balance should be zero
      const finalContractBalance = await ethers.provider.getBalance(await ipromise.getAddress());
      expect(finalContractBalance).to.equal(0n);
    });
  });
});
