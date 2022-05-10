// 1. user creates account with public key
// 2. user authenticates with twitter & discord
// 3. now user can start viewing all discord he's into with this app integrated into that discord -- using server id
// 4.

// 1. How do artist collaborate with a dev easily?
// 2. How do we QC easily.
import ethers from "ethers";

type SourceAddressArray = {
  address: string;
  args: {
    mints: number;
  };
}[];

type KVStoreMap = Map<string, number>;

class KVStore {
  data: KVStoreMap = new Map<string, number>();

  set(key: string, value: number) {
    return this.data.set(key, value);
  }

  getAll(): KVStoreMap {
    return this.data;
  }
}

class AllowlistProcessor {
  db: KVStore;

  constructor() {
    this.db = new KVStore();
  }

  Run(data: SourceAddressArray) {
    data.forEach(({ address, args: { mints } }) => {
      this.db.set(ethers.utils.getAddress(address), mints);
    });
  }
}

abstract class BasicSource {
  allowlistProcessor: AllowlistProcessor;

  constructor(allowlistProcessor: AllowlistProcessor) {
    this.allowlistProcessor = allowlistProcessor;
  }

  abstract Process(): void;
}

export class DiscordSource extends BasicSource {
  Process() {
    const data: SourceAddressArray = [
      {
        address: "0x",
        args: {
          mints: 1,
        },
      },
    ];

    this.allowlistProcessor.Run(data);
  }
}

export class TwitterSource extends BasicSource {
  Process() {
    const data: SourceAddressArray = [
      {
        address: "0x",
        args: {
          mints: 1,
        },
      },
    ];

    this.allowlistProcessor.Run(data);
  }
}

enum SourceEnum {
  DISCORD = 0,
  TWITTER = 1,
}

class SourceManager {
  sources: BasicSource[];
  allowlistProcessor: AllowlistProcessor;

  constructor() {
    this.sources = [];
    this.allowlistProcessor = new AllowlistProcessor();
  }

  StartProcess() {
    this.sources.forEach((source: BasicSource) => {
      source.Process();
    });
  }

  // todo: test
  StartPostProcess() {
    this.allowlistProcessor.db.getAll().forEach((address) => {});
  }

  CreateSource(type: SourceEnum) {
    switch (type) {
      case SourceEnum.DISCORD: {
        this.sources.push(new DiscordSource(this.allowlistProcessor));
        break;
      }
      case SourceEnum.TWITTER: {
        this.sources.push(new TwitterSource(this.allowlistProcessor));
        break;
      }
    }
  }
}

() => {
  const sourceManager = new SourceManager();

  sourceManager.CreateSource(SourceEnum.DISCORD);
  sourceManager.CreateSource(SourceEnum.TWITTER);

  sourceManager.StartProcess();
  sourceManager.StartPostProcess();
};
