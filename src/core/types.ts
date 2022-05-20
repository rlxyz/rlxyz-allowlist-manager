export type EthereumAccountType = {
  address: string;
};

export type DiscordAccountType = {
  userId: number;
};

export type TwitterAccountType = {
  username: string;
};

export enum BasicRuleTypes {
  ADDRESS_RULE = 1,
  DISCORD_RULE = 2,
  TWITTER_RULE = 3,
}
