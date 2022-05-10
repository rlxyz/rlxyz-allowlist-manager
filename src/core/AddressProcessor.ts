import ethers from "ethers";
import { KVStore } from "./KVStore";
import { SourceAddressArray } from "./Source";

export class AddressProcessor {
  db: KVStore;

  constructor() {
    this.db = new KVStore();
  }

  Run(data: SourceAddressArray) {
    data.forEach(({ address, args: { mints } }) => {
      this.db.set(ethers.utils.getAddress(address), mints);
    });
  }
}
