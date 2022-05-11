import { BasicProcessor, ProcessorRuleInterface, Rule } from "./BasicProcessor";
import {
  TwitterProcessorRuleEnum,
  GetTwitterProcessorRule,
} from "./rules/TwitterRules";

import { TwitterAccountType } from "./types";

type TwitterRule = Rule<TwitterAccountType>;

export class TwitterProcessor
  extends BasicProcessor
  implements ProcessorRuleInterface<TwitterAccountType>
{
  _getValidKey(arg: TwitterAccountType): string {
    return String(arg.username);
  }

  _getProcessorRule(type: TwitterProcessorRuleEnum): TwitterRule {
    return GetTwitterProcessorRule(type);
  }
}
