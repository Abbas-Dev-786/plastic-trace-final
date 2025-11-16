const contractService = require("../services/contract.service");
const User = require("../models/user.model");
const QRData = require("../models/qr.model");

exports.getLeaderboard = async (req, res) => {
  try {
    const groupBy = req?.query?.groupBy || "ragPicker"; // ragPicker | recycler | manufacturer

    const data = await QRData.aggregate([
      // {
      //   $match: { status: "Scanned" },
      // },
      { $group: { _id: `$${groupBy}`, count: { $sum: 1 } } },
      {
        $project: {
          user: "$_id",
          count: 1,
          _id: 0,
        },
      },
      {
        $match: {
          user: {
            $ne: null,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.status(200).json({ message: "success", data });
  } catch (error) {
    console.error("Error in getLeaderboard:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(400).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { wallet } = req.params;
    const user = await User.findOne({ walletAddress: wallet });
    const onChainScans = await contractService.getUserScans(wallet);
    const nftBalance = await contractService.getUserNFTCount(wallet);
    const tokenBalance = await contractService.getTokenBalance(wallet);
    res.json({
      user,
      onChainScans: onChainScans.toString(),
      nftBalance: nftBalance.toString(),
      tokenBalance: ethers.utils.formatEther(tokenBalance),
    });
  } catch (error) {
    console.error("Error in getUserProfile:", {
      message: error.message,
      stack: error.stack,
      params: req.params,
    });
    res.status(400).json({ error: error.message });
  }
};

exports.getQRLifecycle = async (req, res) => {
  try {
    const { qrId } = req.params;
    const qrData = await QRData.findOne({ qrId });
    res.json(qrData || { qrId, status: "Not found" });
  } catch (error) {
    console.error("Error in getQRLifecycle:", {
      message: error.message,
      stack: error.stack,
      params: req.params,
    });
    res.status(400).json({ error: error.message });
  }
};
