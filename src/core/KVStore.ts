type KVStoreMap = Map<string, number>;
export class KVStore {
  data: KVStoreMap = new Map<string, number>();

  set(key: string, value: number) {
    return this.data.set(key, value);
  }

  getAll(): KVStoreMap {
    return this.data;
  }
}
