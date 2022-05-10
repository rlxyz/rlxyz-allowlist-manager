import { createJsonWhitelistMerkleRoot } from "@rhapsodylabs/whitelist-merkler"; // Generator
import path from "path"; // Path routing

const whitelistPath: string = path.join(
  __dirname,
  "/storage/presalelist/presalelist.json"
);

const outputPath: string = path.join(
  __dirname,
  "/storage/presalelist/presalelist.json"
);

(async () => {
  await createJsonWhitelistMerkleRoot(whitelistPath, outputPath);
})();
