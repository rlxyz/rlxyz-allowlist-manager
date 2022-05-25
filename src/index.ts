import { getOwnerOfTokenId, getTotalSupply } from "./utils/ethereum";

type ContractSnapshot = {
  timestamp: Date;
  contractAddress: string;
};

class Snapshot {
  contractAddress: string;
  timestamp: Date;

  async captureAllowlistFromContract(
    contractAddress: string
  ): Promise<Map<string, number>> {
    const totalSupply = await getTotalSupply(contractAddress);
    const allowlist: Map<string, number> = new Map<string, number>();
    for (let i = 0; i < totalSupply; i++) {
      const address: string = await getOwnerOfTokenId(contractAddress, i);
      allowlist.set(address, (allowlist.get(address) || 0) + 1);
    }
    return allowlist;
  }

  createMerkleRoot(allowlist: Map<string, number>): any {}
}

(async () => {
  const data: ContractSnapshot = {
    timestamp: new Date(),
    contractAddress: "0x",
  };

  const snapshot = new Snapshot();
  const allowlist = await snapshot.captureAllowlistFromContract(
    data.contractAddress
  );
  const merkleRoot = await snapshot.createMerkleRoot(allowlist);
})();
