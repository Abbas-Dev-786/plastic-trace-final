const { ethers } = require("ethers");
const contractService = require("../services/contract.service");
const User = require("../models/user.model");

exports.registerRole = async (req, res) => {
  try {
    const { role, wallet, signature } = req.body;
    if (!role || !wallet || !signature)
      throw new Error("Role, wallet, and signature are required");

    const message = `Register role: ${role}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase())
      throw new Error("Invalid signature");

    const transaction = await contractService.registerRole(role);
    await User.updateOne({ walletAddress: wallet }, { role }, { upsert: true });

    res.json({ success: true, transaction });
  } catch (error) {
    console.error("Error in registerRole:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { wallet } = req.params;
    if (!wallet) throw new Error("Wallet address is required");

    const user = await User.findOne({ walletAddress: wallet });
    if (!user) throw new Error("User not found");

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUser:", {
      message: error.message,
      stack: error.stack,
      params: req.params,
    });
    res.status(400).json({ error: error.message });
  }
};
