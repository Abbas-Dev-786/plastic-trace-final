// thirdwebClient.ts
import { CHAIN_ID } from "@/constants";
import { createThirdwebClient, defineChain, getContract } from "thirdweb";

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID, // Get from your thirdweb
});

export const moonbaseTestnetChain = defineChain({ id: CHAIN_ID });

export const roleMangerContract = getContract({
  client,
  address: "0x4663E1c09ea9c5120Bc757DD2478f5Ff3FcB6167",
  chain: moonbaseTestnetChain,
});

export const ecoRewardTokenContract = getContract({
  client,
  address: "0x579f57d84ee50123e0d431bdbc339b7daf28ec20",
  chain: moonbaseTestnetChain,
});

export const ecoNftContract = getContract({
  client,
  address: "0x566AC179DbFD2d02769dbF5494b620Aa42e0Af59",
  chain: moonbaseTestnetChain,
});

export const rewardDistributorContract = getContract({
  client,
  address: "0x12F763E90E1A76a1F811D20D976D525423FFC10d",
  chain: moonbaseTestnetChain,
});
