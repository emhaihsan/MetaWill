// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IMetaWillFactory.sol";
import "./MetaWillCommitment.sol";

contract MetaWillFactory is IMetaWillFactory {
    address public owner;
    uint256 public minStakeAmount;
    uint256 public maxStakeAmount;

    // Pre-defined donation addresses
    address[] public donationAddresses;
    mapping(address => string) public donationNames; // Store names for each address

    // Track all commitments created by users
    mapping(address => address[]) public userCommitments;
    address[] public allCommitments;

    // Additional events not defined in the interface
    event DonationAddressAdded(address indexed donationAddress, string name);
    event DonationAddressRemoved(address indexed donationAddress);
    event StakeLimitsUpdated(uint256 minStake, uint256 maxStake);

    constructor(
        address[] memory _initialDonationAddresses,
        string[] memory _initialDonationNames,
        uint256 _minStake,
        uint256 _maxStake
    ) {
        require(
            _initialDonationAddresses.length == _initialDonationNames.length,
            "Arrays must have same length"
        );
        require(
            _initialDonationAddresses.length > 0,
            "Must provide at least one donation address"
        );

        owner = msg.sender;
        minStakeAmount = _minStake;
        maxStakeAmount = _maxStake;

        // Initialize donation addresses
        for (uint i = 0; i < _initialDonationAddresses.length; i++) {
            donationAddresses.push(_initialDonationAddresses[i]);
            donationNames[_initialDonationAddresses[i]] = _initialDonationNames[
                i
            ];
        }
    }

    function createCommitment(
        string memory _title,
        string memory _description,
        uint256 _deadline,
        address _validator,
        uint256 _donationAddressIndex // Index of the chosen donation address
    ) external payable returns (address) {
        require(msg.value >= minStakeAmount, "Stake amount below minimum");
        require(msg.value <= maxStakeAmount, "Stake amount above maximum");
        require(
            _validator != msg.sender,
            "Validator cannot be the same as creator"
        );
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(
            _donationAddressIndex < donationAddresses.length,
            "Invalid donation address index"
        );

        address selectedDonation = donationAddresses[_donationAddressIndex];

        MetaWillCommitment newCommitment = new MetaWillCommitment{
            value: msg.value
        }(
            msg.sender,
            _validator,
            _title,
            _description,
            _deadline,
            selectedDonation
        );

        address commitmentAddress = address(newCommitment);
        userCommitments[msg.sender].push(commitmentAddress);
        allCommitments.push(commitmentAddress);

        emit CommitmentCreated(
            msg.sender,
            commitmentAddress,
            _title,
            selectedDonation
        );

        return commitmentAddress;
    }

    // Admin functions to manage donation addresses
    function addDonationAddress(
        address _newDonationAddress,
        string memory _name
    ) external {
        require(msg.sender == owner, "Only owner can add donation addresses");
        require(_newDonationAddress != address(0), "Cannot add zero address");

        // Check if address already exists
        for (uint i = 0; i < donationAddresses.length; i++) {
            require(
                donationAddresses[i] != _newDonationAddress,
                "Donation address already exists"
            );
        }

        donationAddresses.push(_newDonationAddress);
        donationNames[_newDonationAddress] = _name;

        emit DonationAddressAdded(_newDonationAddress, _name);
    }

    function removeDonationAddress(uint256 _index) external {
        require(
            msg.sender == owner,
            "Only owner can remove donation addresses"
        );
        require(_index < donationAddresses.length, "Invalid index");
        require(
            donationAddresses.length > 1,
            "Cannot remove the last donation address"
        );

        address addressToRemove = donationAddresses[_index];

        // Remove from array by replacing with the last element and then popping
        donationAddresses[_index] = donationAddresses[
            donationAddresses.length - 1
        ];
        donationAddresses.pop();

        // Clear the name mapping
        delete donationNames[addressToRemove];

        emit DonationAddressRemoved(addressToRemove);
    }

    // View functions
    function getUserCommitments(
        address _user
    ) external view returns (address[] memory) {
        return userCommitments[_user];
    }

    function getTotalCommitments() external view returns (uint256) {
        return allCommitments.length;
    }

    function getDonationAddresses()
        external
        view
        returns (address[] memory, string[] memory)
    {
        string[] memory names = new string[](donationAddresses.length);

        for (uint i = 0; i < donationAddresses.length; i++) {
            names[i] = donationNames[donationAddresses[i]];
        }

        return (donationAddresses, names);
    }

    function getDonationAddressCount() external view returns (uint256) {
        return donationAddresses.length;
    }

    function updateStakeLimits(uint256 _minStake, uint256 _maxStake) external {
        require(msg.sender == owner, "Only owner can update stake limits");
        require(_minStake < _maxStake, "Min stake must be less than max stake");
        minStakeAmount = _minStake;
        maxStakeAmount = _maxStake;
        emit StakeLimitsUpdated(_minStake, _maxStake);
    }
}
