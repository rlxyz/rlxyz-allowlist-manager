import {
  BasicRuleProcessor,
  ProcessorRuleInterface,
  RuleInterface,
} from "./BasicRuleProcessor";
import {
  DiscordProcessorRuleEnum,
  GetDiscordProcessorRule,
} from "./rules/DiscordRules";
import { DiscordAccountType } from "./types";

type DiscordRule = RuleInterface<DiscordAccountType>;

export class DiscordRuleProcessor
  extends BasicRuleProcessor
  implements ProcessorRuleInterface<DiscordAccountType>
{
  _getValidKey(arg: DiscordAccountType): string {
    return String(arg.userId);
  }

  _getProcessorRule(type: DiscordProcessorRuleEnum): DiscordRule {
    return GetDiscordProcessorRule(type);
  }
}
