import { ethers, network } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  console.log("Deploying iPROMISE contract...");

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying with account: ${deployer.address}`);

  // Deploy the contract
  const IPROMISEContract = await ethers.getContractFactory("IPROMISEContract");
  const ipromise = await IPROMISEContract.deploy();
  await ipromise.waitForDeployment();

  const contractAddress = await ipromise.getAddress();
  console.log(`IPROMISEContract deployed to: ${contractAddress}`);

  // Add some sample charities
  const charities = [
    "0x89D02B93379952B0C5aC0354724165Da2Ce3146B", // Sample charity 1
    "0x066A62c06A4dCBb5224792db955dB9f4a8bE362d"  // Sample charity 2
  ];

  console.log("Adding sample charities...");
  for (const charity of charities) {
    const tx = await ipromise.approveCharity(charity);
    await tx.wait();
    console.log(`Approved charity: ${charity}`);
  }

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    network: network.name,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
  };

  const deploymentPath = path.join(__dirname, "../deployment-info.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`Deployment info saved to: ${deploymentPath}`);

  console.log("\n----- VERIFICATION INSTRUCTIONS -----");
  console.log(`To verify the contract on Etherscan, run:`);
  console.log(`npx hardhat verify --network sepolia ${contractAddress}`);
  console.log("---------------------------------------");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
