"use strict";

const { withClient, formatConnectionError } = require("./db");

async function main() {
  try {
    const rows = await withClient(async (client) => {
      const result = await client.query(`
        SELECT b.id, b.title, a.name AS author, b.published_year, b.price
        FROM books b
        JOIN authors a ON a.id = b.author_id
        ORDER BY b.id
      `);
      return result.rows;
    });

    console.log("books (from Node.js):");
    console.table(rows);
    console.log(`count: ${rows.length}`);
  } catch (err) {
    console.error(formatConnectionError(err));
    process.exit(1);
  }
}

main();
