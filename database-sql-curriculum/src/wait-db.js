"use strict";

const { withClient, formatConnectionError } = require("./db");

async function waitOnce() {
  await withClient(async (client) => {
    await client.query("SELECT 1");
  });
}

async function main() {
  const maxAttempts = Number(process.env.DB_WAIT_ATTEMPTS || 30);
  const delayMs = Number(process.env.DB_WAIT_DELAY_MS || 1000);

  for (let i = 1; i <= maxAttempts; i++) {
    try {
      await waitOnce();
      console.log(`DB is ready (attempt ${i}/${maxAttempts})`);
      return;
    } catch (err) {
      if (i === maxAttempts) {
        console.error(formatConnectionError(err));
        process.exit(1);
      }
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

main();
