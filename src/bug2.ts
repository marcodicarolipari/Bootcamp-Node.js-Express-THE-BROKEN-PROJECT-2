// Bug 2 — Promise non await-ata
function getBalance(id: string): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(15420.50), 500);
  });
}

async function main(): Promise<void> {
  const saldo = await getBalance("account-001");
  console.log("Saldo:", saldo);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
