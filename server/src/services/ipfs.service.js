// src/services/ipfsService.js
const { upload } = require("thirdweb/storage");

// Create a single global storage client (optional)
module.exports.storageClient = {
  uploadJSON: async (json) => {
    const uri = await upload({ client: globalClient }, json);
    return uri.replace("ipfs://", ""); // return CID only
  },
  uploadFile: async (file) => {
    const uri = await upload({ client: globalClient }, file);
    return uri.replace("ipfs://", "");
  },
};
