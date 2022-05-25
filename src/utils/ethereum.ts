import { ethers } from "ethers";

export const provider = new ethers.providers.JsonRpcProvider(
  process.env.ETH_JSON_RPC_PROVIDER
);

export const getTotalSupply = async (address: string) => {
  const contract = getContract(address);
  return await contract.totalSupply();
};

export const getOwnerOfTokenId = async (address: string, tokenId: number) => {
  const contract = getContract(address);
  return await contract.ownerOf(tokenId);
};

export const getContract = (contractAddress: string): ethers.Contract => {
  const contract = new ethers.Contract(
    contractAddress,
    [
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "currentTotalSupply",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "invocations",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "bytes32[]",
            name: "identifiers",
            type: "bytes32[]",
          },
        ],
        name: "Created",
        type: "event",
      },
    ],
    provider
  );
  return contract;
};
