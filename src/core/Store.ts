type KVStoreMap = Map<string, boolean>;

export abstract class Store {
  abstract set(key: string, value: boolean): void;
  abstract getAll(): string[];
}

export class KVStore extends Store {
  data: KVStoreMap = new Map<string, boolean>();

  set(key: string, value: boolean) {
    return this.data.set(key, value);
  }

  getAll(): string[] {
    const data: string[] = [];
    for (const [address, _] of Object.entries(this.data)) {
      data.push(address);
    }
    return data;
  }
}
