import { AddressProcessor } from "./processor/AddressProcessor";
import { Store } from "./Store";
import { BasicSource, DiscordSource, TwitterSource } from "./Source";

export enum SourceEnum {
  DISCORD = 0,
  TWITTER = 1,
}

export enum ProcessorEnum {
  ADDRESS_PROCESSOR = 0,
}

export class SourceManager {
  sources: BasicSource[];
  addressProcessor: AddressProcessor;

  constructor(db: Store) {
    this.sources = [];
    this.addressProcessor = new AddressProcessor(db);
  }

  StartProcess() {
    this.sources.forEach((source: BasicSource) => {
      source.Process();
    });
  }

  StartPostProcess() {
    this.addressProcessor.db.getAll().forEach((address: string) => {});
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
