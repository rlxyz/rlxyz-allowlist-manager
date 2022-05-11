import { BasicProcessor, ProcessorRuleInterface, Rule } from "./BasicProcessor";
import {
  DiscordProcessorRuleEnum,
  GetDiscordProcessorRule,
} from "./rules/DiscordRules";
import { DiscordAccountType } from "./types";

type DiscordRule = Rule<DiscordAccountType>;

export class DiscordProcessor
  extends BasicProcessor
  implements ProcessorRuleInterface<DiscordAccountType>
{
  _getValidKey(arg: DiscordAccountType): string {
    return String(arg.userId);
  }

  _getProcessorRule(type: DiscordProcessorRuleEnum): DiscordRule {
    return GetDiscordProcessorRule(type);
  }
}
