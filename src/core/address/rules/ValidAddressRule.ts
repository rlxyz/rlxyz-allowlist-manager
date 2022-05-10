import ethers from "ethers";
import { provider } from "../../utils/ethereum";

export enum AddressProcessorRuleEnum {
  ACCOUNT_IS_ADDRESS = 0,
  ACCOUNT_AGE_RULE = 1,
  ACCOUNT_BALANCE_RULE = 2,
}
export abstract class ValidAddressRule {
  abstract Run(address: string): Promise<boolean>;
}
export const GetAddressProcessorRule = (
  type: AddressProcessorRuleEnum
): ValidAddressRule => {
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
export class AccountAgeRule extends ValidAddressRule {
  async Run(address: string): Promise<boolean> {
    return true;
  }
}
export class AccountBalanceRule extends ValidAddressRule {
  async Run(address: string): Promise<boolean> {
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance) > "0";
  }
}
export class AccountIsAddressRule extends ValidAddressRule {
  async Run(address: string): Promise<boolean> {
    return ethers.utils.isAddress(address);
  }
}
