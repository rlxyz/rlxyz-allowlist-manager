import {
  BasicMintProcessor,
  RuleInterface,
} from "../../src/mint/BasicMintProcessor";

type EthereumAccountType = {
  address: string;
};

enum MintProcessorRuleEnum {
  ADDRESS_IS_VALID_ETH_ADDRESS = 0,
  ADDRESS_IS_IN_ALLOWLIST = 1,
  ADDRESS_HAS_MINTS_LEFT = 2,
  ADDRESS_HAS_REQUIRED_BALANCE = 3,
  COLLECTION_HAS_MINTS_LEFT = 4,
  COLLECTION_MINT_REMAINING_TIME_IS_VALID = 5,
}

interface MintRule extends RuleInterface<EthereumAccountType> {
  Run(args: EthereumAccountType): Promise<boolean>;
}

class BasicMintProcessorTest extends BasicMintProcessor {
  _getProcessorRule(type: number): RuleInterface<any> {
    switch (type) {
      case MintProcessorRuleEnum.ADDRESS_IS_VALID_ETH_ADDRESS: {
        return new AddressIsValidEthAddress();
      }
      case MintProcessorRuleEnum.ADDRESS_IS_IN_ALLOWLIST: {
        return new AccountAgeRule();
      }
      case MintProcessorRuleEnum.ADDRESS_HAS_MINTS_LEFT: {
        return new AccountBalanceRule();
      }
      case MintProcessorRuleEnum.ADDRESS_HAS_REQUIRED_BALANCE: {
        return new AccountBalanceRule();
      }
      case MintProcessorRuleEnum.COLLECTION_HAS_MINTS_LEFT: {
        return new AccountBalanceRule();
      }
      case MintProcessorRuleEnum.COLLECTION_MINT_REMAINING_TIME_IS_VALID: {
        return new AccountBalanceRule();
      }
    }
  }

  _getValidKey(arg: any): string {
    return String(arg.address);
  }
}

class AccountAgeRule implements MintRule {
  async Run(args: EthereumAccountType): Promise<boolean> {
    const { address } = args;
    return true;
  }
}
class AccountBalanceRule implements MintRule {
  async Run(args: EthereumAccountType): Promise<boolean> {
    const { address } = args;
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance) > "0";
  }
}
class AddressIsValidEthAddress implements MintRule {
  async Run(args: EthereumAccountType): Promise<boolean> {
    const { address } = args;
    return ethers.utils.isAddress(address);
  }
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
