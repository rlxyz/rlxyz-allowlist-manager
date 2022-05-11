// 1. user creates account with public key
// 2. user authenticates with twitter & discord
// 3. now user can start viewing all discord he's into with this app integrated into that discord -- using server id
// 4.

// 1. How do artist collaborate with a dev easily?
// 2. How do we QC easily.
import { AddressProcessor } from "../processor/AddressProcessor";

export type SourceAddress = {
  address: string;
  args: {
    mints: number;
  };
};
export type SourceAddressArray = SourceAddress[];

export abstract class BasicSource {
  addressProcessor: AddressProcessor;

  constructor(addressProcessor: AddressProcessor) {
    this.addressProcessor = addressProcessor;
  }

  abstract Process(): void;
}
