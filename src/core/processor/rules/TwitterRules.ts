import { Rule } from "../BasicProcessor";
import { TwitterAccountType } from "../types";

export enum TwitterProcessorRuleEnum {
  TWITTER_SERVER_RULE = 0,
  TWITTER_AGE_RULE = 1,
}

export interface TwitterRule extends Rule<TwitterAccountType> {
  Run(args: TwitterAccountType): Promise<boolean>;
}

export const GetTwitterProcessorRule = (
  type: TwitterProcessorRuleEnum
): TwitterRule => {
  switch (type) {
    case TwitterProcessorRuleEnum.TWITTER_AGE_RULE: {
      return new TwitterAgeRule();
    }
    case TwitterProcessorRuleEnum.TWITTER_SERVER_RULE: {
      return new TwitterServerRule();
    }
    default:
      return new TwitterAgeRule();
  }
};

class TwitterAgeRule implements TwitterRule {
  async Run(args: TwitterAccountType): Promise<boolean> {
    return true;
  }
}

class TwitterServerRule implements TwitterRule {
  async Run(args: TwitterAccountType): Promise<boolean> {
    return true;
  }
}
