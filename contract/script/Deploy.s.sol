// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/MetaWillFactory.sol";
import "../src/MetaWillDonation.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Create initial donation addresses
        address[] memory initialDonationAddresses = new address[](3);
        string[] memory initialDonationNames = new string[](3);

        // First donation option (e.g., an education charity)
        MetaWillDonation donation1 = new MetaWillDonation();
        initialDonationAddresses[0] = address(donation1);
        initialDonationNames[0] = "Education For All Foundation";

        // Second donation option (e.g., an environmental charity)
        MetaWillDonation donation2 = new MetaWillDonation();
        initialDonationAddresses[1] = address(donation2);
        initialDonationNames[1] = "World Hunger Relief Foundation";

        // Third donation option (e.g., a health charity)
        MetaWillDonation donation3 = new MetaWillDonation();
        initialDonationAddresses[2] = address(donation3);
        initialDonationNames[2] = "Medical Aid Foundation";

        // Deploy factory with initial donation addresses
        uint256 minStake = 0.001 ether;
        uint256 maxStake = 1000 ether;
        MetaWillFactory factory = new MetaWillFactory(
            initialDonationAddresses,
            initialDonationNames,
            minStake,
            maxStake
        );

        vm.stopBroadcast();

        console.log("Donation Option 1 deployed at:", address(donation1));
        console.log("Donation Option 2 deployed at:", address(donation2));
        console.log("Donation Option 3 deployed at:", address(donation3));
        console.log("MetaWill Factory deployed at:", address(factory));
        console.log("Min Stake: %s wei", minStake);
        console.log("Max Stake: %s wei", maxStake);
    }
}
