import { Store } from "./Store";
import { SourceAddressArray } from "./Source";
import {
  ValidAddressRule,
  AddressProcessorRuleEnum,
  GetAddressProcessorRule,
} from "./rules/ValidAddressRule";

export interface AddressProcessorInterface {
  Run(data: SourceAddressArray): any;
}

export class AddressProcessor implements AddressProcessorInterface {
  db: Store;
  rules: ValidAddressRule[];

  constructor(db: Store) {
    this.db = db;
    this.rules = [];
  }

  CreateRules(type: AddressProcessorRuleEnum) {
    this.rules.push(GetAddressProcessorRule(type));
  }

  ProcessRules(address: string): boolean {
    return (
      this.rules
        .map((rule: ValidAddressRule) => {
          return rule.Run(address);
        })
        .filter(Boolean).length > 1
    );
  }

  Run(data: SourceAddressArray): any {
    data.forEach(({ address, args: { mints } }) => {
      const valid = this.ProcessRules(address);
      if (valid) {
        this.db.set(address, mints);
      }
    });
  }
}
