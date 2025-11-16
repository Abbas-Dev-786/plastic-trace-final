const {
  keccak256,
  toHex,
  getContractEvents,
  prepareEvent,
  sendAndConfirmTransaction,
  readContract,
} = require("thirdweb");
const { prepareContractCall, sendTransaction } = require("thirdweb");
const {
  account,
  getContractInstance,
  moonbaseTestnet,
} = require("../config/thirdweb.config");

const contracts = {
  roleManager: getContractInstance(
    process.env.CONTRACT_ROLE_MANAGER,
    "RoleManager"
  ),
  qrManager: getContractInstance(
    process.env.CONTRACT_QR_MANAGER,
    "QRCodeManager"
  ),
  recyclingTracker: getContractInstance(
    process.env.CONTRACT_RECYCLING_TRACKER,
    "RecyclingTracker"
  ),
  rewardToken: getContractInstance(
    process.env.CONTRACT_REWARD_TOKEN,
    "RewardToken"
  ),
  rewardDistributor: getContractInstance(
    process.env.CONTRACT_REWARD_DISTRIBUTOR,
    "RewardDistributor"
  ),
  ecoNFT: getContractInstance(process.env.CONTRACT_ECONFT, "EcoNFT"),
};

const readContractValue = async (contract, method, params) => {
  const data = await readContract({
    contract,
    method,
    params,
  });

  return data;
};

const getContractLatestEvent = async (contract, signature) => {
  const events = await getContractEvents({
    contract,
    events: [
      prepareEvent({ signature }), // event QRCodesGenerated(uint256[] qrIds)
    ],
  });

  const latestEvent = events.length > 0 ? events.at(-1) : null;

  return latestEvent;
};

/* Admin Actions (Server-Side Signing) */
const generateQRCodes = async (amount) => {
  if (!Number.isInteger(Number(amount)) || amount <= 0 || amount > 1000) {
    throw new Error("Amount must be an integer between 1 and 1000");
  }
  try {
    const transaction = await prepareContractCall({
      contract: contracts.qrManager,
      method: "function generateQRCodes(uint256 amount)",
      params: [amount],
    });

    const tx = await sendAndConfirmTransaction({ transaction, account });

    return { tx };
  } catch (error) {
    console.error("Error in generateQRCodes:", {
      message: error.message,
      stack: error.stack,
      amount,
      contractAddress: process.env.CONTRACT_QR_MANAGER,
    });
    throw error;
  }
};

const assignQR = async (qrId, manufacturer) => {
  if (!Number.isInteger(Number(qrId)) || qrId <= 0)
    throw new Error("Invalid QR ID");
  if (!manufacturer.match(/^0x[a-fA-F0-9]{40}$/))
    throw new Error("Invalid manufacturer address");
  try {
    const transaction = await prepareContractCall({
      contract: contracts.qrManager,
      method:
        "function assignQRToManufacturer(uint256 qrId, address manufacturer)",
      params: [BigInt(qrId), manufacturer],
    });
    const tx = await sendTransaction({
      transaction,
      account,
      chain: moonbaseTestnet,
    });
    return tx;
  } catch (error) {
    console.error("Error in assignQR:", {
      message: error.message,
      stack: error.stack,
      qrId,
      manufacturer,
    });
    throw error;
  }
};

const setQRMetadata = async (qrId, ipfsHash) => {
  if (!Number.isInteger(Number(qrId)) || qrId <= 0)
    throw new Error("Invalid QR ID");
  if (!ipfsHash) throw new Error("IPFS hash is required");
  try {
    const transaction = await prepareContractCall({
      contract: contracts.qrManager,
      method: "function setQRMetadata(uint256 qrId, string ipfsHash)",
      params: [BigInt(qrId), ipfsHash],
    });
    const tx = await sendTransaction({
      transaction,
      account,
      chain: moonbaseTestnet,
    });
    return tx;
  } catch (error) {
    console.error("Error in setQRMetadata:", {
      message: error.message,
      stack: error.stack,
      qrId,
      ipfsHash,
    });
    throw error;
  }
};

/* User Actions (Return Transaction Objects for Frontend Signing) */
const registerRole = async (role) => {
  if (
    ![
      "ADMIN_ROLE",
      "MANUFACTURER_ROLE",
      "RECYCLER_ROLE",
      "RAGPICKER_ROLE",
      "CITIZEN_ROLE",
    ].includes(role)
  ) {
    throw new Error("Invalid role");
  }
  const transaction = await prepareContractCall({
    contract: contracts.roleManager,
    method: "function registerRole(bytes32 role)",
    params: [keccak256(toHex(role))],
  });

  // Get the encoded data
  const encodedData = await transaction.data();

  // Return transaction parameters instead of the prepared transaction
  return {
    to: transaction.to,
    data: encodedData,
    value: "0", // or 0n if using BigInt
    // You can also include the original parameters for frontend reconstruction
    contractAddress: contracts.roleManager.address,
    methodName: "registerRole",
    params: [keccak256(toHex(role))],
    role: role,
  };
};

const scanQR = async (qrId) => {
  if (!Number.isInteger(Number(qrId)) || qrId <= 0)
    throw new Error("Invalid QR ID");

  const transaction = await prepareContractCall({
    contract: contracts.recyclingTracker,
    method: "function scanQR(uint256 qrId)",
    params: [qrId],
  });

  // Get the encoded data
  const encodedData = await transaction.data();

  // Return transaction parameters instead of the prepared transaction
  return {
    to: transaction.to,
    data: encodedData,
    value: "0", // or 0n if using BigInt
    // You can also include the original parameters for frontend reconstruction
    contractAddress: contracts.recyclingTracker.address,
    methodName: "scanQR",
    params: [qrId],
    qrId: qrId,
  };
};

const verifyScan = async (qrId) => {
  if (!Number.isInteger(Number(qrId)) || qrId <= 0)
    throw new Error("Invalid QR ID");

  const transaction = await prepareContractCall({
    contract: contracts.recyclingTracker,
    method: "function verifyScan(uint256 qrId)",
    params: [qrId],
  });

  // Get the encoded data
  const encodedData = await transaction.data();

  // Return transaction parameters instead of the prepared transaction
  return {
    to: transaction.to,
    data: encodedData,
    value: "0", // or 0n if using BigInt
    // You can also include the original parameters for frontend reconstruction
    contractAddress: contracts.recyclingTracker.address,
    methodName: "verifyScan",
    params: [qrId],
    qrId,
  };
};

const markRecycled = async (qrId) => {
  if (!Number.isInteger(Number(qrId)) || qrId <= 0)
    throw new Error("Invalid QR ID");
  return await prepareContractCall({
    contract: contracts.recyclingTracker,
    method: "function markRecycled(uint256 qrId)",
    params: [BigInt(qrId)],
  });
};

const distributeRewards = async (qrId) => {
  if (!Number.isInteger(Number(qrId)) || qrId <= 0)
    throw new Error("Invalid QR ID");

  const transaction = await prepareContractCall({
    contract: contracts.rewardDistributor,
    method: "function distributeRewards(uint256 qrId)",
    params: [qrId],
  });

  const encodedData = await transaction.data();

  return {
    to: transaction.to,
    data: encodedData,
    value: "0", // or 0n if using BigInt
    // You can also include the original parameters for frontend reconstruction
    contractAddress: contracts.rewardDistributor.address,
    methodName: "distributeRewards",
    params: [qrId],
    qrId,
  };
};

/* Read Functions */
const getUserScans = async (wallet) => {
  if (!wallet.match(/^0x[a-fA-F0-9]{40}$/))
    throw new Error("Invalid wallet address");
  return await contracts.recyclingTracker.call("getUserScans", [wallet]);
};

const getUserNFTCount = async (wallet) => {
  if (!wallet.match(/^0x[a-fA-F0-9]{40}$/))
    throw new Error("Invalid wallet address");
  return await contracts.ecoNFT.call("balanceOf", [wallet]);
};

const getTokenBalance = async (wallet) => {
  if (!wallet.match(/^0x[a-fA-F0-9]{40}$/))
    throw new Error("Invalid wallet address");
  return await contracts.rewardToken.call("balanceOf", [wallet]);
};

module.exports = {
  registerRole,
  generateQRCodes,
  assignQR,
  setQRMetadata,
  scanQR,
  verifyScan,
  markRecycled,
  distributeRewards,
  getUserScans,
  getUserNFTCount,
  getTokenBalance,
  contracts,
  getContractLatestEvent,
  readContractValue,
};
