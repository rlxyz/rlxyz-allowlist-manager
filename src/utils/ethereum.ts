import { ethers } from "ethers";

export const provider = new ethers.providers.JsonRpcProvider(
  process.env.ETH_JSON_RPC_PROVIDER
);
