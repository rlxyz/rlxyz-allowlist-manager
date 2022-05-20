import {
  BasicRuleProcessor,
  ProcessorRuleInterface,
  RuleInterface,
} from "./BasicRuleProcessor";
import {
  TwitterProcessorRuleEnum,
  GetTwitterProcessorRule,
} from "./rules/TwitterRules";

import { TwitterAccountType } from "./types";

type TwitterRule = RuleInterface<TwitterAccountType>;

export class TwitterRuleProcessor
  extends BasicRuleProcessor
  implements ProcessorRuleInterface<TwitterAccountType>
{
  _getValidKey(arg: TwitterAccountType): string {
    return String(arg.username);
  }

  _getProcessorRule(type: TwitterProcessorRuleEnum): TwitterRule {
    return GetTwitterProcessorRule(type);
  }
}
