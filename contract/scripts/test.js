const { ethers } = require("hardhat");

const ADMIN_ROLE = ethers.keccak256(ethers.toUtf8Bytes("ADMIN_ROLE"));
console.log("ADMIN_ROLE:", ADMIN_ROLE);