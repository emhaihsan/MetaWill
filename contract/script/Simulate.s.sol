// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/MetaWillFactory.sol";
import "../src/MetaWillCommitment.sol";
import "../src/MetaWillDonation.sol";
import "../src/interfaces/IMetaWillCommitment.sol";

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

        // Setup donasi
        MetaWillDonation donation1 = new MetaWillDonation();
        MetaWillDonation donation2 = new MetaWillDonation();

        address[] memory donationAddresses = new address[](2);
        donationAddresses[0] = address(donation1);
        donationAddresses[1] = address(donation2);

        string[] memory donationNames = new string[](2);
        donationNames[0] = "Education Fund";
        donationNames[1] = "Health Fund";

        // Deploy factory
        MetaWillFactory factory = new MetaWillFactory(
            donationAddresses,
            donationNames,
            0.01 ether,
            10 ether
        );

        vm.stopBroadcast();

        // 1. User membuat komitmen
        vm.startBroadcast(userPrivateKey);
        vm.deal(user, 1 ether); // Berikan ETH ke user

        address commitmentAddress = factory.createCommitment{value: 0.1 ether}(
            "Belajar Solidity",
            "Belajar Solidity 2 jam/hari selama seminggu",
            block.timestamp + 7 days,
            validator,
            0
        );

        MetaWillCommitment commitment = MetaWillCommitment(commitmentAddress);

        // Buat komitmen kedua
        address commitmentAddress2 = factory.createCommitment{value: 0.2 ether}(
            "Olahraga Rutin",
            "Olahraga 30 menit setiap hari",
            block.timestamp + 14 days,
            validator,
            1
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

        address failedCommitmentAddress = factory.createCommitment{
            value: 0.1 ether
        }(
            "Komitmen yang Gagal",
            "Ini akan gagal",
            block.timestamp + 1 days,
            validator,
            0
        );

        MetaWillCommitment failedCommitment = MetaWillCommitment(
            failedCommitmentAddress
        );

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

        uint256 successCount = 0;
        uint256 failCount = 0;
        uint256 pendingCount = 0;

        for (uint i = 0; i < userCommitments.length; i++) {
            MetaWillCommitment comm = MetaWillCommitment(userCommitments[i]);
            IMetaWillCommitment.CommitmentStatus status = comm.status();

            if (
                status == IMetaWillCommitment.CommitmentStatus.CompletedSuccess
            ) {
                successCount++;
            } else if (
                status == IMetaWillCommitment.CommitmentStatus.CompletedFailure
            ) {
                failCount++;
            } else {
                pendingCount++;
            }

            // Print detail komitmen
            (
                address creator,
                address validator,
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
            console.log("Stake:", stakeAmount);
            console.log("Status:", uint(_status));
            console.log("Alamat Donasi:", comm.getDonationAddress());
        }

        console.log("\nRingkasan Komitmen:");
        console.log("Berhasil:", successCount);
        console.log("Gagal:", failCount);
        console.log("Pending:", pendingCount);

        // 5. Statistik validator
        console.log("\n--- STATISTIK VALIDATOR ---");

        address[] memory validatorCommitments = factory.getValidatorCommitments(
            validator
        );
        console.log(
            "Jumlah komitmen yang divalidasi:",
            validatorCommitments.length
        );

        // 6. Statistik donasi
        console.log("\n--- STATISTIK DONASI ---");

        console.log("Donasi #1 (Education Fund):");
        console.log("Total donasi:", donation1.getTotalDonations());
        console.log("Saldo saat ini:", donation1.getBalance());
        console.log("Kontribusi user:", donation1.getDonorContribution(user));

        console.log("\nDonasi #2 (Health Fund):");
        console.log("Total donasi:", donation2.getTotalDonations());
        console.log("Saldo saat ini:", donation2.getBalance());
        console.log("Kontribusi user:", donation2.getDonorContribution(user));

        // 7. Owner withdraw donasi
        vm.startBroadcast(deployerPrivateKey);
        address payable recipient = payable(deployer);

        uint256 donation1Balance = donation1.getBalance();
        if (donation1Balance > 0) {
            donation1.withdrawFunds(recipient, donation1Balance);
            console.log("\nWithdraw dari Donasi #1:", donation1Balance);
        }

        vm.stopBroadcast();

        console.log("\n--- STATISTIK SETELAH WITHDRAW ---");
        console.log("Donasi #1 saldo:", donation1.getBalance());
        console.log("Penerima saldo:", recipient.balance);
    }
}
