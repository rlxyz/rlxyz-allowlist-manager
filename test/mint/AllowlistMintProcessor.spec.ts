import { AllowlistMintProcessor } from "../../src/mint/AllowlistMintProcessor";

test("adds 1 + 2 to equal 3", () => {
  const allowlistMintProcessor = new AllowlistMintProcessor();
  allowlistMintProcessor.AddRule(1).AddRule(2);
  expect(sum(1, 2)).toBe(3);
});
