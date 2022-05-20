import { RuleInterface } from "../BasicRuleProcessor";
import { DiscordAccountType } from "../types";

export enum DiscordProcessorRuleEnum {
  DISCORD_SERVER_RULE = 0,
  DISCORD_AGE_RULE = 1,
}

export interface DiscordRule extends RuleInterface<DiscordAccountType> {
  Run(args: DiscordAccountType): Promise<boolean>;
}

export const GetDiscordProcessorRule = (
  type: DiscordProcessorRuleEnum
): DiscordRule => {
  switch (type) {
    case DiscordProcessorRuleEnum.DISCORD_AGE_RULE: {
      return new DiscordAgeRule();
    }
    case DiscordProcessorRuleEnum.DISCORD_SERVER_RULE: {
      return new DiscordServerRule();
    }
    default:
      return new DiscordAgeRule();
  }
};

class DiscordAgeRule implements DiscordRule {
  async Run(args: DiscordAccountType): Promise<boolean> {
    return true;
  }
}

class DiscordServerRule implements DiscordRule {
  async Run(args: DiscordAccountType): Promise<boolean> {
    return true;
  }
}
