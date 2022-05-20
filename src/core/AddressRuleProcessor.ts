import {
  BasicRuleProcessor,
  ProcessorRuleInterface,
  RuleInterface,
} from "./BasicRuleProcessor";
import {
  AddressProcessorRuleEnum,
  GetAddressProcessorRule,
} from "./rules/AddressRules";
import { EthereumAccountType } from "./types";

type AddressRule = RuleInterface<EthereumAccountType>;

export class AddressRuleProcessor
  extends BasicRuleProcessor
  implements ProcessorRuleInterface<EthereumAccountType>
{
  _getValidKey(arg: EthereumAccountType): string {
    return String(arg.address);
  }

  _getProcessorRule(type: AddressProcessorRuleEnum): AddressRule {
    return GetAddressProcessorRule(type);
  }
}
