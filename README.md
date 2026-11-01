# Broken Project — Giorno 2: Async TypeScript & Node.js Runtime

## Istruzioni
1. `npm install`
2. Esegui ogni file bug con `npx tsx src/bugN.ts`
3. La feature opzionale è in `src/feature.ts`

## Bug 1 — 🔴 `await` fuori da funzione async
**Sintomi**: `SyntaxError: await is only valid in async functions`

## Bug 2 — 🟡 Promise non await-ata
**Sintomi**: stampa `Promise { <pending> }` invece del valore.

## Bug 3 — 🟢 Promise.all crasha senza gestione errori parziali
**Sintomi**: `UnhandledPromiseRejection` — non è chiaro quale operazione ha fallito.

## Feature opzionale
Implementa `CustomerService` con dependency injection e `getCustomerWithAccounts` con `Promise.all`.
