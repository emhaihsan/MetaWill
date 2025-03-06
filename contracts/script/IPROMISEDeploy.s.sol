// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/IPROMISEContract.sol";

contract IPROMISEDeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the contract
        IPROMISEContract ipromise = new IPROMISEContract();
        
        // Add some initial charities as examples
        // These would be replaced with actual charity addresses in a real deployment
        ipromise.addCharity(address(0x1111111111111111111111111111111111111111)); // Example charity 1
        ipromise.addCharity(address(0x2222222222222222222222222222222222222222)); // Example charity 2

        vm.stopBroadcast();
    }
}
