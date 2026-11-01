import { readFile } from "fs/promises";

async function main(): Promise<void> {
  const data = await readFile("package.json", "utf-8");
  console.log(JSON.parse(data).name);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
