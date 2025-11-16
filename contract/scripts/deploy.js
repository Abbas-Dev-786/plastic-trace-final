const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`🚀 Deploying contracts with account: ${deployer.address}`);

  const dummyAddress = "0x0000000000000000000000000000000000000000";

  // 1️⃣ Deploy RoleManager
  const RoleManager = await ethers.getContractFactory("RoleManager");
  const roleManager = await RoleManager.deploy();
  console.log(`✅ RoleManager deployed to: ${roleManager.target}`);

  // 2️⃣ Deploy EcoNFT with dummy RecyclingTracker
  const EcoNFT = await ethers.getContractFactory("EcoNFT");
  const ecoNFT = await EcoNFT.deploy(roleManager.target, dummyAddress);
  console.log(`✅ EcoNFT deployed to: ${ecoNFT.target}`);

  // 3️⃣ Deploy RecyclingTracker with real EcoNFT
  const RecyclingTracker = await ethers.getContractFactory("RecyclingTracker");
  const recyclingTracker = await RecyclingTracker.deploy(
    roleManager.target,
    ecoNFT.target
  );
  console.log(`✅ RecyclingTracker deployed to: ${recyclingTracker.target}`);

  // 4️⃣ Update EcoNFT with real RecyclingTracker
  await ecoNFT.setRecyclingTracker(recyclingTracker.target);
  console.log(`🔗 EcoNFT updated with RecyclingTracker address`);

  // 5️⃣ Deploy QRCodeManager
  const QRCodeManager = await ethers.getContractFactory("QRCodeManager");
  const qrCodeManager = await QRCodeManager.deploy(roleManager.target);
  console.log(`✅ QRCodeManager deployed to: ${qrCodeManager.target}`);

  // 6️⃣ Deploy RewardToken
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy(roleManager.target);
  console.log(`✅ RewardToken deployed to: ${rewardToken.target}`);

  // 7️⃣ Deploy RewardDistributor
  const RewardDistributor = await ethers.getContractFactory(
    "RewardDistributor"
  );
  const rewardDistributor = await RewardDistributor.deploy(
    roleManager.target,
    recyclingTracker.target,
    rewardToken.target
  );
  console.log(`✅ RewardDistributor deployed to: ${rewardDistributor.target}`);

  // 8️⃣ Grant ADMIN_ROLE to RewardDistributor and RecyclingTracker
  const ADMIN_ROLE = ethers.keccak256(ethers.toUtf8Bytes("ADMIN_ROLE"));

  await roleManager.grantRole(ADMIN_ROLE, rewardDistributor.target);
  await roleManager.grantRole(ADMIN_ROLE, recyclingTracker.target);
  console.log(
    `🔐 ADMIN_ROLE granted to RewardDistributor and RecyclingTracker`
  );

  // 📜 Final addresses
  console.log(`\n🌟 Deployed Contract Addresses:`);
  console.log(`RoleManager:        ${roleManager.target}`);
  console.log(`EcoNFT:             ${ecoNFT.target}`);
  console.log(`RecyclingTracker:   ${recyclingTracker.target}`);
  console.log(`QRCodeManager:      ${qrCodeManager.target}`);
  console.log(`RewardToken:        ${rewardToken.target}`);
  console.log(`RewardDistributor:  ${rewardDistributor.target}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
