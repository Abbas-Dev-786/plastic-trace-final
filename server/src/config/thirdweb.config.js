const { createThirdwebClient, defineChain, getContract } = require("thirdweb");
const { privateKeyToAccount } = require("thirdweb/wallets");

const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});

const moonbaseTestnet = defineChain({ id: 1287 });

const account = privateKeyToAccount({
  privateKey: process.env.PRIVATE_KEY,
  chain: moonbaseTestnet, // Moonbase EVM test-net
  client,
});

const getContractInstance = (address, name) => {
  if (!address || !address.match(/^0x[a-fA-F0-9]{40}$/)) {
    throw new Error(`Invalid contract address for ${name}: ${address}`);
  }

  return getContract({ client, address, chain: moonbaseTestnet });
};

module.exports = {
  account,
  client,
  getContractInstance,
  moonbaseTestnet,
};
