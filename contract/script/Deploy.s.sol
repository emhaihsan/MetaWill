// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/MetaWillFactory.sol";
import "../src/MetaWillDonation.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Create two initial donation addresses
        address[] memory initialDonationAddresses = new address[](2);
        string[] memory initialDonationNames = new string[](2);

        // First donation option (e.g., an education charity)
        MetaWillDonation donation1 = new MetaWillDonation();
        initialDonationAddresses[0] = address(donation1);
        initialDonationNames[0] = "Education For All Foundation";

        // Second donation option (e.g., an environmental charity)
        MetaWillDonation donation2 = new MetaWillDonation();
        initialDonationAddresses[1] = address(donation2);
        initialDonationNames[1] = "Climate Action Fund";

        // Deploy factory with initial donation addresses
        uint256 minStake = 0.01 ether;
        uint256 maxStake = 10 ether;
        MetaWillFactory factory = new MetaWillFactory(
            initialDonationAddresses,
            initialDonationNames,
            minStake,
            maxStake
        );

        vm.stopBroadcast();

        console.log("Donation Option 1 deployed at:", address(donation1));
        console.log("Donation Option 2 deployed at:", address(donation2));
        console.log("MetaWill Factory deployed at:", address(factory));
    }
}
