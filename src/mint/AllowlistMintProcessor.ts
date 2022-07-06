import { timeStamp } from "console";
import { ethers } from "ethers";
import { getContract, provider } from "../utils/ethereum";
import { BasicMintProcessor, RuleInterface } from "./BasicMintProcessor";

type IAllowlist = Record<string, number>;

export const allowlist: IAllowlist = {
  "0xE2D2e99fA28220c8bc9BC9d42B8D65f76D6F994D": 1,
};

const collectionMaxMint = 1111;
const collectionContractAddress = "0x123";
const collectionMintPrice = 50000000000000000;
const collectionPublicMintTime = new Date(+1);
const collectionAllowlistMintTime = new Date(-1);

type MintDetails = {
  address: string;
  amount: number;
  timestamp: Date;
};

enum MintProcessorRuleEnum {
  ADDRESS_IS_VALID_ETH_ADDRESS = 0,
  ADDRESS_IS_IN_ALLOWLIST = 1,
  ADDRESS_HAS_MINTS_LEFT = 2,
  ADDRESS_HAS_REQUIRED_BALANCE = 3,
  COLLECTION_HAS_MINTS_LEFT = 4,
  COLLECTION_MINT_REMAINING_TIME_IS_VALID = 5,
}

interface MintRule extends RuleInterface<MintDetails> {
  Run(args: MintDetails): Promise<boolean>;
}

export class AllowlistMintProcessor extends BasicMintProcessor {
  _getProcessorRule(type: number): MintRule {
    switch (type) {
      case MintProcessorRuleEnum.ADDRESS_IS_VALID_ETH_ADDRESS: {
        return new AddressIsValidEthAddress();
      }
      case MintProcessorRuleEnum.ADDRESS_IS_IN_ALLOWLIST: {
        return new AddressIsInAllowlist();
      }
      case MintProcessorRuleEnum.ADDRESS_HAS_MINTS_LEFT: {
        return new AddressHasMintsLeft();
      }
      case MintProcessorRuleEnum.ADDRESS_HAS_REQUIRED_BALANCE: {
        return new AddressHasRequiredBalance();
      }
      case MintProcessorRuleEnum.COLLECTION_HAS_MINTS_LEFT: {
        return new CollectionHasMintsLeft();
      }
      case MintProcessorRuleEnum.COLLECTION_MINT_REMAINING_TIME_IS_VALID: {
        return new CollectionMintTimeIsValid();
      }
      default:
        return new AddressIsValidEthAddress();
    }
  }

  _getValidKey(arg: any): string {
    return String(arg.address);
  }
}

class AddressIsValidEthAddress implements MintRule {
  async Run(args: MintDetails): Promise<boolean> {
    const { address } = args;
    return ethers.utils.isAddress(address);
  }
}

class AddressIsInAllowlist implements MintRule {
  async Run(args: MintDetails): Promise<boolean> {
    const { address } = args;
    return address in allowlist && true;
  }
}

class AddressHasMintsLeft implements MintRule {
  async Run(args: MintDetails): Promise<boolean> {
    const { address, amount } = args;
    const contract = getContract(String(collectionContractAddress));
    const userMintAmount = await contract.mintOf(address); // infer contract has mintOf function
    if (userMintAmount == allowlist[address]) return false; // infer that user is in allowlist
    if (amount > allowlist[address]) return false;
    if (userMintAmount - amount <= 0) return false;
    return true;
  }
}

class CollectionHasMintsLeft implements MintRule {
  async Run(args: MintDetails): Promise<boolean> {
    const contract = getContract(collectionContractAddress);
    const totalSupply = await contract.totalSupply();
    if (totalSupply == collectionMaxMint) return false;
    return true;
  }
}

class AddressHasRequiredBalance implements MintRule {
  async Run(args: MintDetails): Promise<boolean> {
    const { address, amount } = args;
    const balance = await provider.getBalance(address);
    if (balance.toNumber() < amount * collectionMintPrice) return false; // todo: fix and test
    return true;
  }
}

class CollectionMintTimeIsValid implements MintRule {
  async Run(args: MintDetails): Promise<boolean> {
    const { timestamp } = args;
    if (timestamp > collectionPublicMintTime) return false; // infer in public mint
    return true;
  }
}
