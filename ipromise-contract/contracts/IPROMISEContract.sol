// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IPROMISEContract
 * @dev Smart contract for the iPROMISE Web3 Commitment Platform
 */
contract IPROMISEContract {
    // Enums
    enum CommitmentStatus { Active, Completed, Failed, Canceled }

    // Structs
    struct Validator {
        address validatorAddress;
        bool hasValidated;
        bool approvedCompletion;
    }

    struct CommitmentBasicInfo {
        uint256 id;
        address owner;
        string title;
        string description;
        uint256 stake;
        uint256 deadline;
        address charityAddress;
    }
    
    struct CommitmentStatusInfo {
        CommitmentStatus status;
        address validator;
        bool hasValidated;
        bool approvedCompletion;
        uint256 createdAt;
    }

    struct Commitment {
        uint256 id;
        address owner;
        string title;
        string description;
        uint256 stake;
        uint256 deadline;
        address charityAddress;
        CommitmentStatus status;
        address validator;
        bool hasValidated;
        bool approvedCompletion;
        uint256 createdAt;
    }

    // State variables
    address private _owner;
    uint256 private _nextCommitmentId;
    mapping(uint256 => Commitment) private _commitments;
    mapping(address => uint256[]) private _userCommitments;
    mapping(address => bool) private _approvedCharities;
    uint256 private _platformFeePercentage; // in basis points (e.g., 500 = 5%)
    
    // Events
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
    
    event CommitmentCanceled(
        uint256 indexed commitmentId,
        address indexed owner
    );
    
    event CharityApproved(
        address indexed charityAddress
    );
    
    event CharityRemoved(
        address indexed charityAddress
    );
    
    event PlatformFeeUpdated(
        uint256 newFeePercentage
    );
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == _owner, "Only owner can call this function");
        _;
    }
    
    modifier validCommitment(uint256 commitmentId) {
        require(commitmentId < _nextCommitmentId, "Commitment does not exist");
        _;
    }
    
    modifier onlyCommitmentOwner(uint256 commitmentId) {
        require(_commitments[commitmentId].owner == msg.sender, "Only commitment owner can call this function");
        _;
    }
    
    modifier onlyValidator(uint256 commitmentId) {
        require(_commitments[commitmentId].validator == msg.sender, "Only assigned validator can call this function");
        _;
    }
    
    modifier activeCommitment(uint256 commitmentId) {
        require(_commitments[commitmentId].status == CommitmentStatus.Active, "Commitment is not active");
        _;
    }
    
    // Constructor
    constructor() {
        _owner = msg.sender;
        _nextCommitmentId = 1;
        _platformFeePercentage = 500; // 5% default fee
    }
    
    // External functions
    function createCommitment(
        string memory title,
        string memory description,
        uint256 deadline,
        address charityAddress
    ) external payable {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(deadline > block.timestamp, "Deadline must be in the future");
        require(msg.value > 0, "Must stake some ETH");
        require(_approvedCharities[charityAddress], "Charity address not approved");
        
        uint256 commitmentId = _nextCommitmentId++;
        
        _commitments[commitmentId] = Commitment({
            id: commitmentId,
            owner: msg.sender,
            title: title,
            description: description,
            stake: msg.value,
            deadline: deadline,
            charityAddress: charityAddress,
            status: CommitmentStatus.Active,
            validator: address(0),
            hasValidated: false,
            approvedCompletion: false,
            createdAt: block.timestamp
        });
        
        _userCommitments[msg.sender].push(commitmentId);
        
        emit CommitmentCreated(
            commitmentId,
            msg.sender,
            title,
            msg.value,
            deadline
        );
    }
    
    function assignValidator(
        uint256 commitmentId,
        address validator
    ) external validCommitment(commitmentId) onlyCommitmentOwner(commitmentId) activeCommitment(commitmentId) {
        require(validator != address(0), "Invalid validator address");
        require(validator != msg.sender, "Cannot assign self as validator");
        require(_commitments[commitmentId].validator == address(0), "Validator already assigned");
        
        _commitments[commitmentId].validator = validator;
        
        emit ValidatorAssigned(commitmentId, validator);
    }
    
    function validateCommitment(
        uint256 commitmentId,
        bool approved
    ) external validCommitment(commitmentId) onlyValidator(commitmentId) activeCommitment(commitmentId) {
        Commitment storage commitment = _commitments[commitmentId];
        
        require(!commitment.hasValidated, "Already validated");
        
        commitment.hasValidated = true;
        commitment.approvedCompletion = approved;
        
        if (approved) {
            commitment.status = CommitmentStatus.Completed;
            
            // Calculate platform fee
            uint256 platformFee = (commitment.stake * _platformFeePercentage) / 10000;
            uint256 returnAmount = commitment.stake - platformFee;
            
            // Return stake to owner minus platform fee
            (bool sent, ) = commitment.owner.call{value: returnAmount}("");
            require(sent, "Failed to send ETH");
            
            emit CommitmentCompleted(commitmentId, commitment.owner, returnAmount);
        } else {
            commitment.status = CommitmentStatus.Failed;
            
            // Calculate platform fee
            uint256 platformFee = (commitment.stake * _platformFeePercentage) / 10000;
            uint256 charityAmount = commitment.stake - platformFee;
            
            // Send stake to charity minus platform fee
            (bool sent, ) = commitment.charityAddress.call{value: charityAmount}("");
            require(sent, "Failed to send ETH to charity");
            
            emit CommitmentFailed(commitmentId, commitment.owner, commitment.charityAddress, charityAmount);
        }
        
        emit ValidationSubmitted(commitmentId, msg.sender, approved);
    }
    
    function cancelCommitment(
        uint256 commitmentId
    ) external validCommitment(commitmentId) onlyCommitmentOwner(commitmentId) activeCommitment(commitmentId) {
        Commitment storage commitment = _commitments[commitmentId];
        
        require(commitment.validator == address(0), "Cannot cancel: validator has been added");
        
        commitment.status = CommitmentStatus.Canceled;
        
        // Return stake to owner (no platform fee for cancellations)
        (bool sent, ) = commitment.owner.call{value: commitment.stake}("");
        require(sent, "Failed to send ETH");
        
        emit CommitmentCanceled(commitmentId, commitment.owner);
    }
    
    function forceCompleteExpiredCommitment(
        uint256 commitmentId
    ) external validCommitment(commitmentId) activeCommitment(commitmentId) {
        Commitment storage commitment = _commitments[commitmentId];
        
        require(block.timestamp > commitment.deadline, "Commitment not yet expired");
        require(!commitment.hasValidated, "Commitment already validated");
        
        // If validator was assigned but didn't validate in time, owner gets stake back
        if (commitment.validator != address(0)) {
            commitment.status = CommitmentStatus.Completed;
            commitment.hasValidated = true;
            commitment.approvedCompletion = true;
            
            // Calculate platform fee
            uint256 platformFee = (commitment.stake * _platformFeePercentage) / 10000;
            uint256 returnAmount = commitment.stake - platformFee;
            
            // Return stake to owner minus platform fee
            (bool sent, ) = commitment.owner.call{value: returnAmount}("");
            require(sent, "Failed to send ETH");
            
            emit CommitmentCompleted(commitmentId, commitment.owner, returnAmount);
        } 
        // If no validator was assigned, it's considered failed
        else {
            commitment.status = CommitmentStatus.Failed;
            commitment.hasValidated = true;
            commitment.approvedCompletion = false;
            
            // Calculate platform fee
            uint256 platformFee = (commitment.stake * _platformFeePercentage) / 10000;
            uint256 charityAmount = commitment.stake - platformFee;
            
            // Send stake to charity minus platform fee
            (bool sent, ) = commitment.charityAddress.call{value: charityAmount}("");
            require(sent, "Failed to send ETH to charity");
            
            emit CommitmentFailed(commitmentId, commitment.owner, commitment.charityAddress, charityAmount);
        }
    }
    
    // Admin functions
    function approveCharity(address charityAddress) external onlyOwner {
        require(charityAddress != address(0), "Invalid charity address");
        require(!_approvedCharities[charityAddress], "Charity already approved");
        
        _approvedCharities[charityAddress] = true;
        
        emit CharityApproved(charityAddress);
    }
    
    function removeCharity(address charityAddress) external onlyOwner {
        require(_approvedCharities[charityAddress], "Charity not approved");
        
        _approvedCharities[charityAddress] = false;
        
        emit CharityRemoved(charityAddress);
    }
    
    function updatePlatformFee(uint256 newFeePercentage) external onlyOwner {
        require(newFeePercentage <= 1000, "Fee cannot exceed 10%");
        
        _platformFeePercentage = newFeePercentage;
        
        emit PlatformFeeUpdated(newFeePercentage);
    }
    
    function withdrawPlatformFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool sent, ) = _owner.call{value: balance}("");
        require(sent, "Failed to send ETH");
    }
    
    // View functions
    function getCommitmentBasicInfo(uint256 commitmentId) external view validCommitment(commitmentId) returns (CommitmentBasicInfo memory) {
        Commitment storage commitment = _commitments[commitmentId];
        return CommitmentBasicInfo({
            id: commitment.id,
            owner: commitment.owner,
            title: commitment.title,
            description: commitment.description,
            stake: commitment.stake,
            deadline: commitment.deadline,
            charityAddress: commitment.charityAddress
        });
    }
    
    function getCommitmentStatusInfo(uint256 commitmentId) external view validCommitment(commitmentId) returns (CommitmentStatusInfo memory) {
        Commitment storage commitment = _commitments[commitmentId];
        return CommitmentStatusInfo({
            status: commitment.status,
            validator: commitment.validator,
            hasValidated: commitment.hasValidated,
            approvedCompletion: commitment.approvedCompletion,
            createdAt: commitment.createdAt
        });
    }
    
    function getUserCommitments(address user) external view returns (uint256[] memory) {
        return _userCommitments[user];
    }
    
    function isCharityApproved(address charityAddress) external view returns (bool) {
        return _approvedCharities[charityAddress];
    }
    
    function getPlatformFeePercentage() external view returns (uint256) {
        return _platformFeePercentage;
    }
    
    function getOwner() external view returns (address) {
        return _owner;
    }
}
