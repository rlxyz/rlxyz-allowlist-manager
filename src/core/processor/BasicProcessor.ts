import { Store } from "../Store";

export interface ProcessorRuleInterface<RuleGenericType> {
  AddRule(type: number): boolean;
  RemoveRule(type: number): boolean;
  ProcessRules(args: RuleGenericType): boolean;
}

export interface Rule<RuleGenericType> {
  Run(args: RuleGenericType): Promise<boolean>;
}

type BasicRule = Rule<any>;

export abstract class BasicProcessor implements ProcessorRuleInterface<any> {
  db: Store;
  rules: BasicRule[];

  constructor(db: Store) {
    this.db = db;
    this.rules = [];
  }

  Run(args: any[]): any {
    args.forEach((arg: any) => {
      const valid = this.ProcessRules(arg);
      if (valid) {
        this.db.set(this._getValidKey(arg), true);
      }
    });
  }

  AddRule(type: number): boolean {
    const rule = this._getProcessorRule(type);
    this.rules.push(rule);
    return true;
  }

  RemoveRule(type: number): boolean {
    throw new Error("Method not implemented.");
  }

  ProcessRules(args: any): boolean {
    return (
      this.rules
        .map((rule: BasicRule) => {
          return rule.Run(args);
        })
        .filter(Boolean).length > 1
    );
  }

  abstract _getProcessorRule(type: number): BasicRule;

  abstract _getValidKey(arg: any): string;
}
