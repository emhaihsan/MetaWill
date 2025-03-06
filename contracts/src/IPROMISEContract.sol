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
    uint256 private _commitmentIdCounter;
    mapping(uint256 => Commitment) private _commitments;
    mapping(address => uint256[]) private _userCommitments;
    mapping(address => uint256[]) private _userValidations;
    address[] private _approvedCharities;
    address private _owner;
    uint256 private _platformFeePercentage; // In basis points (1% = 100)

    // Events
    event CommitmentCreated(
        uint256 indexed commitmentId,
        address indexed owner,
        string title,
        uint256 stake,
        uint256 deadline
    );
    
    event CommitmentUpdated(
        uint256 indexed commitmentId,
        CommitmentStatus status
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

    event CharityAdded(address indexed charity);
    event CharityRemoved(address indexed charity);
    event PlatformFeeUpdated(uint256 newFeePercentage);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the contract owner can call this function");
        _;
    }

    modifier onlyCommitmentOwner(uint256 commitmentId) {
        require(_commitments[commitmentId].owner == msg.sender, "Only the commitment owner can call this function");
        _;
    }

    modifier validCommitment(uint256 commitmentId) {
        require(commitmentId < _commitmentIdCounter, "Commitment does not exist");
        _;
    }

    modifier onlyValidator(uint256 commitmentId) {
        require(_commitments[commitmentId].validator == msg.sender, "Only the validator can call this function");
        _;
    }

    modifier activeCommitment(uint256 commitmentId) {
        require(_commitments[commitmentId].status == CommitmentStatus.Active, "Commitment is not active");
        _;
    }

    // Constructor
    constructor() {
        _owner = msg.sender;
        _platformFeePercentage = 100; // 1% default fee
    }

    /**
     * @dev Creates a new commitment
     * @param title Title of the commitment
     * @param description Description of the commitment
     * @param deadline Deadline timestamp for the commitment
     * @param charityAddress Address of the charity to receive funds if commitment fails
     */
    function createCommitment(
        string memory title,
        string memory description,
        uint256 deadline,
        address charityAddress
    ) external payable {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(deadline > block.timestamp, "Deadline must be in the future");
        require(msg.value > 0, "Stake amount must be greater than 0");
        require(_isApprovedCharity(charityAddress), "Charity address is not approved");

        uint256 commitmentId = _commitmentIdCounter++;
        
        Commitment storage newCommitment = _commitments[commitmentId];
        newCommitment.id = commitmentId;
        newCommitment.owner = msg.sender;
        newCommitment.title = title;
        newCommitment.description = description;
        newCommitment.stake = msg.value;
        newCommitment.deadline = deadline;
        newCommitment.charityAddress = charityAddress;
        newCommitment.status = CommitmentStatus.Active;
        newCommitment.createdAt = block.timestamp;
        
        _userCommitments[msg.sender].push(commitmentId);
        
        emit CommitmentCreated(commitmentId, msg.sender, title, msg.value, deadline);
    }

    /**
     * @dev Assigns a validator to a commitment
     * @param commitmentId ID of the commitment
     * @param validator Address of the validator
     */
    function assignValidator(
        uint256 commitmentId,
        address validator
    ) external validCommitment(commitmentId) onlyCommitmentOwner(commitmentId) activeCommitment(commitmentId) {
        require(validator != address(0), "Invalid validator address");
        require(validator != _commitments[commitmentId].owner, "Commitment owner cannot be a validator");
        require(_commitments[commitmentId].validator == address(0), "Validator already assigned");
        
        Commitment storage commitment = _commitments[commitmentId];
        commitment.validator = validator;
        
        _userValidations[validator].push(commitmentId);
        
        emit ValidatorAssigned(commitmentId, validator);
    }

    /**
     * @dev Submit validation for a commitment
     * @param commitmentId ID of the commitment
     * @param approved Whether the validator approves the commitment completion
     */
    function validateCommitment(
        uint256 commitmentId,
        bool approved
    ) external validCommitment(commitmentId) onlyValidator(commitmentId) activeCommitment(commitmentId) {
        Commitment storage commitment = _commitments[commitmentId];
        
        require(!commitment.hasValidated, "Validator has already validated");
        
        commitment.hasValidated = true;
        commitment.approvedCompletion = approved;
        
        emit ValidationSubmitted(commitmentId, msg.sender, approved);
        
        // Finalize the commitment based on validation
        _finalizeCommitment(commitmentId);
    }

    /**
     * @dev Finalizes a commitment based on validation result
     * @param commitmentId ID of the commitment
     */
    function _finalizeCommitment(uint256 commitmentId) internal {
        Commitment storage commitment = _commitments[commitmentId];
        
        bool isSuccessful = commitment.approvedCompletion;
        
        if (isSuccessful) {
            commitment.status = CommitmentStatus.Completed;
            
            // Calculate platform fee
            uint256 fee = (commitment.stake * _platformFeePercentage) / 10000;
            uint256 payout = commitment.stake - fee;
            
            // Transfer staked amount back to the owner minus platform fee
            (bool sent, ) = commitment.owner.call{value: payout}("");
            require(sent, "Failed to send ETH to owner");
            
            emit CommitmentCompleted(commitmentId, commitment.owner, payout);
        } else {
            commitment.status = CommitmentStatus.Failed;
            
            // Calculate platform fee
            uint256 fee = (commitment.stake * _platformFeePercentage) / 10000;
            uint256 charityAmount = commitment.stake - fee;
            
            // Transfer funds to charity minus platform fee
            (bool sent, ) = commitment.charityAddress.call{value: charityAmount}("");
            require(sent, "Failed to send ETH to charity");
            
            emit CommitmentFailed(commitmentId, commitment.owner, commitment.charityAddress, charityAmount);
        }
        
        emit CommitmentUpdated(commitmentId, commitment.status);
    }

    /**
     * @dev Cancels a commitment if no validator has been added yet
     * @param commitmentId ID of the commitment
     */
    function cancelCommitment(
        uint256 commitmentId
    ) external validCommitment(commitmentId) onlyCommitmentOwner(commitmentId) activeCommitment(commitmentId) {
        Commitment storage commitment = _commitments[commitmentId];
        
        // Only allow cancellation if no validator has been added yet
        require(commitment.validator == address(0), "Cannot cancel: validator has been added");
        
        commitment.status = CommitmentStatus.Canceled;
        
        // Return staked amount to the owner
        (bool sent, ) = commitment.owner.call{value: commitment.stake}("");
        require(sent, "Failed to send ETH back to owner");
        
        emit CommitmentUpdated(commitmentId, CommitmentStatus.Canceled);
    }

    /**
     * @dev Forces the completion of a commitment if deadline has passed
     * @param commitmentId ID of the commitment
     */
    function forceCompleteExpiredCommitment(
        uint256 commitmentId
    ) external validCommitment(commitmentId) activeCommitment(commitmentId) {
        Commitment storage commitment = _commitments[commitmentId];
        
        require(block.timestamp > commitment.deadline, "Deadline has not passed yet");
        
        // If validator has not submitted yet, send to charity
        if (!commitment.hasValidated) {
            commitment.status = CommitmentStatus.Failed;
            
            // Calculate platform fee
            uint256 fee = (commitment.stake * _platformFeePercentage) / 10000;
            uint256 charityAmount = commitment.stake - fee;
            
            // Transfer funds to charity
            (bool sent, ) = commitment.charityAddress.call{value: charityAmount}("");
            require(sent, "Failed to send ETH to charity");
            
            emit CommitmentFailed(commitmentId, commitment.owner, commitment.charityAddress, charityAmount);
        } else {
            // Use the validation we have
            _finalizeCommitment(commitmentId);
        }
    }

    /**
     * @dev Adds a charity to the approved list
     * @param charityAddress Address of the charity
     */
    function addCharity(
        address charityAddress
    ) external onlyOwner {
        require(charityAddress != address(0), "Invalid charity address");
        require(!_isApprovedCharity(charityAddress), "Charity already approved");
        
        _approvedCharities.push(charityAddress);
        
        emit CharityAdded(charityAddress);
    }

    /**
     * @dev Removes a charity from the approved list
     * @param charityAddress Address of the charity
     */
    function removeCharity(
        address charityAddress
    ) external onlyOwner {
        require(_isApprovedCharity(charityAddress), "Charity not approved");
        
        for (uint256 i = 0; i < _approvedCharities.length; i++) {
            if (_approvedCharities[i] == charityAddress) {
                // Replace with the last element and pop
                _approvedCharities[i] = _approvedCharities[_approvedCharities.length - 1];
                _approvedCharities.pop();
                break;
            }
        }
        
        emit CharityRemoved(charityAddress);
    }

    /**
     * @dev Updates the platform fee percentage
     * @param newFeePercentage New fee percentage in basis points (1% = 100)
     */
    function updatePlatformFee(
        uint256 newFeePercentage
    ) external onlyOwner {
        require(newFeePercentage <= 1000, "Fee cannot exceed 10%"); // Max 10%
        
        _platformFeePercentage = newFeePercentage;
        
        emit PlatformFeeUpdated(newFeePercentage);
    }

    /**
     * @dev Withdraws platform fees to the contract owner
     */
    function withdrawPlatformFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool sent, ) = _owner.call{value: balance}("");
        require(sent, "Failed to withdraw platform fees");
    }

    /**
     * @dev Checks if a charity is approved
     * @param charityAddress Address of the charity to check
     * @return bool True if the charity is approved
     */
    function _isApprovedCharity(address charityAddress) internal view returns (bool) {
        for (uint256 i = 0; i < _approvedCharities.length; i++) {
            if (_approvedCharities[i] == charityAddress) {
                return true;
            }
        }
        return false;
    }

    // View functions

    /**
     * @dev Gets details about a commitment
     * @param commitmentId ID of the commitment
     * @return id Commitment ID
     * @return owner Address of commitment owner
     * @return title Title of the commitment
     * @return description Description of the commitment
     * @return stake Amount staked on the commitment
     * @return deadline Deadline timestamp for the commitment
     * @return charityAddress Address of the charity
     * @return status Status of the commitment
     * @return validator Address of the validator
     * @return hasValidated Whether the validator has validated
     * @return approvedCompletion Whether the validator approved completion
     * @return createdAt Timestamp when commitment was created
     */
    function getCommitment(
        uint256 commitmentId
    ) external view validCommitment(commitmentId) returns (
        uint256 id,
        address owner,
        string memory title,
        string memory description,
        uint256 stake,
        uint256 deadline,
        address charityAddress,
        CommitmentStatus status,
        address validator,
        bool hasValidated,
        bool approvedCompletion,
        uint256 createdAt
    ) {
        Commitment storage commitment = _commitments[commitmentId];
        
        return (
            commitment.id,
            commitment.owner,
            commitment.title,
            commitment.description,
            commitment.stake,
            commitment.deadline,
            commitment.charityAddress,
            commitment.status,
            commitment.validator,
            commitment.hasValidated,
            commitment.approvedCompletion,
            commitment.createdAt
        );
    }

    /**
     * @dev Gets commitments created by a user
     * @param user Address of the user
     * @return uint256[] Array of commitment IDs
     */
    function getUserCommitments(
        address user
    ) external view returns (uint256[] memory) {
        return _userCommitments[user];
    }

    /**
     * @dev Gets commitments where a user is a validator
     * @param user Address of the user
     * @return uint256[] Array of commitment IDs
     */
    function getUserValidationCommitments(
        address user
    ) external view returns (uint256[] memory) {
        return _userValidations[user];
    }

    /**
     * @dev Gets the list of approved charities
     * @return address[] Array of approved charity addresses
     */
    function getApprovedCharities() external view returns (address[] memory) {
        return _approvedCharities;
    }

    /**
     * @dev Gets the current platform fee percentage
     * @return uint256 Platform fee percentage in basis points
     */
    function getPlatformFeePercentage() external view returns (uint256) {
        return _platformFeePercentage;
    }

    /**
     * @dev Gets the contract owner address
     * @return address Owner address
     */
    function getOwner() external view returns (address) {
        return _owner;
    }

    /**
     * @dev Gets the total number of commitments created
     * @return uint256 Total commitments count
     */
    function getTotalCommitments() external view returns (uint256) {
        return _commitmentIdCounter;
    }
}
