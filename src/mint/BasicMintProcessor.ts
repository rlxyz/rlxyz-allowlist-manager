import { Store } from "../utils/Store";

export interface ProcessorRuleInterface<RuleGenericType> {
  AddRule(type: number): boolean;
  RemoveRule(type: number): boolean;
  ProcessRules(args: RuleGenericType): boolean;
}

export interface RuleInterface<RuleGenericType> {
  Run(args: RuleGenericType): Promise<boolean>;
}

type BasicRule = RuleInterface<any>;

export abstract class BasicMintProcessor
  implements ProcessorRuleInterface<any>
{
  rules: BasicRule[];

  constructor() {
    this.rules = [];
  }

  ProcessRules(args: any[]): any {
    return this.rules.map((rule: BasicRule) => {
      return rule.Run(args);
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

  abstract _getProcessorRule(type: number): BasicRule;

  abstract _getValidKey(arg: any): string;
}
