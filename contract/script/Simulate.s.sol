// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MetaWillFactory.sol";
import "../src/MetaWillCommitment.sol";
import "../src/MetaWillDonation.sol";
import "../src/interfaces/IMetaWillCommitment.sol";
import "openzeppelin/mocks/token/ERC20Mock.sol";

contract SimulateScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        uint256 userPrivateKey = vm.envUint("USER_PRIVATE_KEY");
        uint256 validatorPrivateKey = vm.envUint("VALIDATOR_PRIVATE_KEY");

        address deployer = vm.addr(deployerPrivateKey);
        address user = vm.addr(userPrivateKey);
        address validator = vm.addr(validatorPrivateKey);

        console.log("Deployer:", deployer);
        console.log("User:", user);
        console.log("Validator:", validator);

        // Deploy kontrak
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Mock USDC
        ERC20Mock usdc = new ERC20Mock();

        // Setup donasi
        address[] memory initialDonationAddresses = new address[](2);
        string[] memory initialDonationNames = new string[](2);

        // Deploy donation contracts and get their addresses
        MetaWillDonation donation1 = new MetaWillDonation(address(usdc));
        MetaWillDonation donation2 = new MetaWillDonation(address(usdc));
        initialDonationAddresses[0] = address(donation1);
        initialDonationAddresses[1] = address(donation2);

        initialDonationNames[0] = "Education Fund";
        initialDonationNames[1] = "Health Fund";

        // Deploy factory
        uint256 minStake = 1 * 1e6; // 1 USDC
        uint256 maxStake = 10000 * 1e6; // 10,000 USDC
        MetaWillFactory factory =
            new MetaWillFactory(address(usdc), initialDonationAddresses, initialDonationNames, minStake, maxStake);

        vm.stopBroadcast();

        // Mint some USDC for the user
        usdc.mint(user, 1000 * 1e6); // Mint 1000 USDC

        // 1. User membuat komitmen
        vm.startBroadcast(userPrivateKey);

        uint256 stake1 = 100 * 1e6; // 100 USDC
        usdc.approve(address(factory), stake1);

        address commitmentAddress = factory.createCommitment(
            "Belajar Solidity",
            "Belajar Solidity 2 jam/hari selama seminggu",
            block.timestamp + 7 days,
            validator,
            0,
            stake1
        );

        MetaWillCommitment commitment = MetaWillCommitment(commitmentAddress);

        // Buat komitmen kedua
        uint256 stake2 = 200 * 1e6; // 200 USDC
        usdc.approve(address(factory), stake2);
        address commitmentAddress2 = factory.createCommitment(
            "Olahraga Rutin", "Olahraga 30 menit setiap hari", block.timestamp + 14 days, validator, 1, stake2
        );

        MetaWillCommitment commitment2 = MetaWillCommitment(commitmentAddress2);

        // User melaporkan keberhasilan untuk komitmen pertama
        commitment.reportCompletion(true);

        vm.stopBroadcast();

        // 2. Validator memvalidasi
        vm.startBroadcast(validatorPrivateKey);

        // Validator mengkonfirmasi keberhasilan
        commitment.validateCompletion(true);

        vm.stopBroadcast();

        // 3. Simulasi donasi gagal
        vm.startBroadcast(userPrivateKey);

        uint256 stake3 = 50 * 1e6; // 50 USDC
        usdc.approve(address(factory), stake3);
        address failedCommitmentAddress = factory.createCommitment(
            "Komitmen yang Gagal", "Ini akan gagal", block.timestamp + 1 days, validator, 0, stake3
        );

        MetaWillCommitment failedCommitment = MetaWillCommitment(failedCommitmentAddress);

        // User melaporkan kegagalan
        failedCommitment.reportCompletion(false);

        vm.stopBroadcast();

        // Validator mengkonfirmasi kegagalan
        vm.startBroadcast(validatorPrivateKey);
        try failedCommitment.validateCompletion(false) {
            console.log("Validasi komitmen gagal berhasil");
        } catch Error(string memory reason) {
            console.log("Error saat validasi komitmen gagal:", reason);
        }
        vm.stopBroadcast();

        // 4. Statistik user
        console.log("\n--- STATISTIK USER ---");

        // Dapatkan komitmen user
        address[] memory userCommitments = factory.getUserCommitments(user);
        console.log("Jumlah komitmen user:", userCommitments.length);
        console.log("Saldo USDC user:", usdc.balanceOf(user));

        uint256 successCount = 0;
        uint256 failCount = 0;
        uint256 pendingCount = 0;

        for (uint256 i = 0; i < userCommitments.length; i++) {
            MetaWillCommitment comm = MetaWillCommitment(userCommitments[i]);
            IMetaWillCommitment.CommitmentStatus status = comm.status();

            if (status == IMetaWillCommitment.CommitmentStatus.CompletedSuccess) {
                successCount++;
            } else if (status == IMetaWillCommitment.CommitmentStatus.CompletedFailure) {
                failCount++;
            } else {
                pendingCount++;
            }

            // Print detail komitmen
            (
                address _creator,
                address _validator,
                string memory title,
                string memory description,
                uint256 deadline,
                uint256 stakeAmount,
                IMetaWillCommitment.CommitmentStatus _status,
                bool _creatorReportedSuccess,
                bool _validatorConfirmed,
                bool _validatorReportedSuccess
            ) = comm.getCommitmentDetails();

            console.log("\nKomitmen #%d:", i + 1);
            console.log("Judul:", title);
            console.log("Deskripsi:", description);
            console.log("Deadline:", deadline);
            console.log("Stake (USDC):", stakeAmount / 1e6);
            console.log("Status:", uint256(_status));
            console.log("Alamat Donasi:", comm.getDonationAddress());
        }

        console.log("\nRingkasan Komitmen:");
        console.log("Berhasil:", successCount);
        console.log("Gagal:", failCount);
        console.log("Pending:", pendingCount);

        // 5. Statistik validator
        console.log("\n--- STATISTIK VALIDATOR ---");

        address[] memory validatorCommitments = factory.getValidatorCommitments(validator);
        console.log("Jumlah komitmen yang divalidasi:", validatorCommitments.length);

        // 6. Statistik donasi
        console.log("\n--- STATISTIK DONASI ---");

        console.log("Donasi #1 (Education Fund):", address(donation1));
        console.log("Saldo USDC:", usdc.balanceOf(address(donation1)));

        console.log("\nDonasi #2 (Health Fund):", address(donation2));
        console.log("Saldo USDC:", usdc.balanceOf(address(donation2)));

        console.log("\n--- SIMULASI SELESAI ---");
    }
}
