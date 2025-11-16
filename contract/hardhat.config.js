require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    moonbase: {
      url: "https://rpc.api.moonbase.moonbeam.network", // Moonbase RPC URL
      chainId: 1287, // Moonbase chain ID
      accounts: [process.env.PRIVATE_KEY], // Your wallet private key
    },
  },
};
