import { BasicProcessor, ProcessorRuleInterface, Rule } from "./BasicProcessor";
import {
  AddressProcessorRuleEnum,
  GetAddressProcessorRule,
} from "./rules/AddressRules";
import { EthereumAccountType } from "./types";

type AddressRule = Rule<EthereumAccountType>;

export class AddressProcessor
  extends BasicProcessor
  implements ProcessorRuleInterface<EthereumAccountType>
{
  _getValidKey(arg: EthereumAccountType): string {
    return String(arg.address);
  }

  _getProcessorRule(type: AddressProcessorRuleEnum): AddressRule {
    return GetAddressProcessorRule(type);
  }
}
