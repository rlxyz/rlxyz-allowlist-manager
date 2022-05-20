import ethers from "ethers";
import { provider } from "../../utils/ethereum";
import { RuleInterface } from "../BasicRuleProcessor";
import { EthereumAccountType } from "../types";

export enum AddressProcessorRuleEnum {
  ACCOUNT_IS_ADDRESS = 0,
  ACCOUNT_AGE_RULE = 1,
  ACCOUNT_BALANCE_RULE = 2,
}

export interface AccountRule extends RuleInterface<EthereumAccountType> {
  Run(args: EthereumAccountType): Promise<boolean>;
}

export const GetAddressProcessorRule = (
  type: AddressProcessorRuleEnum
): AccountRule => {
  switch (type) {
    case AddressProcessorRuleEnum.ACCOUNT_IS_ADDRESS: {
      return new AccountIsAddressRule();
    }
    case AddressProcessorRuleEnum.ACCOUNT_AGE_RULE: {
      return new AccountAgeRule();
    }
    case AddressProcessorRuleEnum.ACCOUNT_AGE_RULE: {
      return new AccountBalanceRule();
    }
    default:
      return new AccountIsAddressRule();
  }
};
class AccountAgeRule implements AccountRule {
  async Run(args: EthereumAccountType): Promise<boolean> {
    const { address } = args;
    return true;
  }
}
class AccountBalanceRule implements AccountRule {
  async Run(args: EthereumAccountType): Promise<boolean> {
    const { address } = args;
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance) > "0";
  }
}
class AccountIsAddressRule implements AccountRule {
  async Run(args: EthereumAccountType): Promise<boolean> {
    const { address } = args;
    return ethers.utils.isAddress(address);
  }
}
