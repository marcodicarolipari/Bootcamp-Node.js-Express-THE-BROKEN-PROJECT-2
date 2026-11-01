// Bug 3 — Promise.all crasha al primo errore
async function fetchData(url: string): Promise<string> {
  // Simula una chiamata HTTP — la seconda fallisce
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes("invalid")) {
        reject(new Error(`Errore nel caricare ${url}`));
      } else {
        resolve(`Dati da ${url}`);
      }
    }, 100);
  });
}

async function loadDashboard(): Promise<void> {
  const results = await Promise.allSettled([
    fetchData("https://api.example.com/accounts"),
    fetchData("https://api.example.com/invalid-endpoint"),
    fetchData("https://api.example.com/customers"),
  ]);

  for (const [index, result] of results.entries()) {
    if (result.status === "fulfilled") {
      console.log("Dato caricato:", result.value);
    } else {
      console.error(`Caricamento ${index + 1} non riuscito:`, result.reason);
    }
  }
}

loadDashboard().catch((error: unknown) => {
  console.error("Errore imprevisto nel caricamento della dashboard:", error);
  process.exitCode = 1;
});
