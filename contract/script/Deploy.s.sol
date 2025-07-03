// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MetaWillFactory.sol";
import "../src/MetaWillDonation.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address usdcAddress = vm.envAddress("USDC_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        // Setup donasi
        address[] memory initialDonationAddresses = new address[](3);
        string[] memory initialDonationNames = new string[](3);

        MetaWillDonation donation1 = new MetaWillDonation(usdcAddress);
        initialDonationAddresses[0] = address(donation1);
        initialDonationNames[0] = "Education For All Foundation";

        MetaWillDonation donation2 = new MetaWillDonation(usdcAddress);
        initialDonationAddresses[1] = address(donation2);
        initialDonationNames[1] = "Climate Action Fund";

        MetaWillDonation donation3 = new MetaWillDonation(usdcAddress);
        initialDonationAddresses[2] = address(donation3);
        initialDonationNames[2] = "Animal Welfare Society";

        // Deploy factory
        uint256 minStake = 1 * 1e6; // 1 USDC
        uint256 maxStake = 1000 * 1e6; // 1000 USDC
        MetaWillFactory factory =
            new MetaWillFactory(usdcAddress, initialDonationAddresses, initialDonationNames, minStake, maxStake);

        vm.stopBroadcast();

        console.log("Donation Option 1 deployed at:", address(donation1));
        console.log("Donation Option 2 deployed at:", address(donation2));
        console.log("Donation Option 3 deployed at:", address(donation3));
        console.log("MetaWill Factory deployed at:", address(factory));
        console.log("Min Stake: %s wei", minStake);
        console.log("Max Stake: %s wei", maxStake);
    }
}
