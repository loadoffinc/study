"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { withClient, formatConnectionError } = require("./db");

async function main() {
  const relative = process.argv[2];
  if (!relative) {
    console.error("Usage: node src/apply-sql.js <path-to.sql>");
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), relative);
  const sql = fs.readFileSync(filePath, "utf8");

  try {
    await withClient(async (client) => {
      await client.query(sql);
    });
    console.log(`Applied: ${relative}`);
  } catch (err) {
    console.error(formatConnectionError(err));
    process.exit(1);
  }
}

main();
