type KVStoreMap = Map<string, number>;

export abstract class Store {
  abstract set(key: string, value: number): void;
  abstract getAll(): KVStoreMap;
}

export class KVStore extends Store {
  data: KVStoreMap = new Map<string, number>();

  set(key: string, value: number) {
    return this.data.set(key, value);
  }

  getAll(): KVStoreMap {
    return this.data;
  }
}
