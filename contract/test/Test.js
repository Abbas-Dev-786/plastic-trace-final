const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Plastic Waste System", function () {
  let roleManager,
    rewardToken,
    ecoNFT,
    recyclingTracker,
    qrCodeManager,
    rewardDistributor;
  let deployer, user;

  beforeEach(async function () {
    [deployer, user] = await ethers.getSigners();

    const RoleManager = await ethers.getContractFactory("RoleManager");
    roleManager = await RoleManager.deploy();
    console.log("RoleManager:", roleManager.target);

    const RewardToken = await ethers.getContractFactory("RewardToken");
    rewardToken = await RewardToken.deploy(roleManager.target);
    console.log("RewardToken:", rewardToken.target);

    const EcoNFT = await ethers.getContractFactory("EcoNFT");
    ecoNFT = await EcoNFT.deploy(roleManager.target, ethers.ZeroAddress);
    console.log("EcoNFT:", ecoNFT.target);

    const RecyclingTracker = await ethers.getContractFactory(
      "RecyclingTracker"
    );
    recyclingTracker = await RecyclingTracker.deploy(
      roleManager.target,
      ecoNFT.target
    );
    console.log("RecyclingTracker:", recyclingTracker.target);

    await ecoNFT.setRecyclingTracker(recyclingTracker.target);

    const QRCodeManager = await ethers.getContractFactory("QRCodeManager");
    qrCodeManager = await QRCodeManager.deploy(roleManager.target);
    console.log("QRCodeManager:", qrCodeManager.target);

    const RewardDistributor = await ethers.getContractFactory(
      "RewardDistributor"
    );
    rewardDistributor = await RewardDistributor.deploy(
      roleManager.target,
      recyclingTracker.target,
      rewardToken.target
    );
    console.log("RewardDistributor:", rewardDistributor.target);

    await roleManager.grantRole(
      ethers.keccak256(ethers.toUtf8Bytes("ADMIN_ROLE")),
      rewardDistributor.target
    );
    await roleManager.grantRole(
      ethers.keccak256(ethers.toUtf8Bytes("ADMIN_ROLE")),
      recyclingTracker.target
    );
  });

  it("should allow role registration", async function () {
    await roleManager
      .connect(user)
      .registerRole(ethers.keccak256(ethers.toUtf8Bytes("RAGPICKER_ROLE")));
    expect(
      await roleManager.hasRole(
        ethers.keccak256(ethers.toUtf8Bytes("RAGPICKER_ROLE")),
        user.address
      )
    ).to.be.true;
  });

  it("should generate and assign QR codes", async function () {
    await qrCodeManager.generateQRCodes(1);
    await qrCodeManager.assignQRToManufacturer(1, user.address);
    expect(await qrCodeManager.qrToManufacturer(1)).to.equal(user.address);
  });

  it("should track recycling and mint NFTs", async function () {
    await roleManager
      .connect(user)
      .registerRole(ethers.keccak256(ethers.toUtf8Bytes("RAGPICKER_ROLE")));
    await qrCodeManager.generateQRCodes(1);
    await recyclingTracker.connect(user).scanQR(1);
    expect(await recyclingTracker.userScans(user.address)).to.equal(1);
  });

  it("should distribute rewards", async function () {
    await roleManager
      .connect(user)
      .registerRole(ethers.keccak256(ethers.toUtf8Bytes("RAGPICKER_ROLE")));
    await roleManager.grantRole(
      ethers.keccak256(ethers.toUtf8Bytes("RECYCLER_ROLE")),
      deployer.address
    );
    await qrCodeManager.generateQRCodes(1);
    await recyclingTracker.connect(user).scanQR(1);
    await recyclingTracker.verifyScan(1);
    await rewardDistributor.distributeRewards(1);
    expect(await rewardToken.balanceOf(user.address)).to.equal(
      ethers.utils.parseEther("10")
    );
  });
});
