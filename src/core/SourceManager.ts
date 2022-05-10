import { AddressProcessor } from "./AddressProcessor";
import { BasicSource, DiscordSource, TwitterSource } from "./Source";

export enum SourceEnum {
  DISCORD = 0,
  TWITTER = 1,
}

export class SourceManager {
  sources: BasicSource[];
  addressProcessor: AddressProcessor;

  constructor() {
    this.sources = [];
    this.addressProcessor = new AddressProcessor();
  }

  StartProcess() {
    this.sources.forEach((source: BasicSource) => {
      source.Process();
    });
  }

  StartPostProcess() {
    this.addressProcessor.db.getAll().forEach((address) => {});
  }

  CreateSource(type: SourceEnum) {
    switch (type) {
      case SourceEnum.DISCORD: {
        this.sources.push(new DiscordSource(this.addressProcessor));
        break;
      }
      case SourceEnum.TWITTER: {
        this.sources.push(new TwitterSource(this.addressProcessor));
        break;
      }
    }
  }
}
