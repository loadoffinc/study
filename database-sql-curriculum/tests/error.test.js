"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { Client } = require("pg");
const { withClient, getConfig, formatConnectionError } = require("../src/db");

describe("error cases", () => {
  it("fails when connecting to a closed port", async () => {
    const client = new Client(
      getConfig({
        port: 59999,
        connectionTimeoutMillis: 1000,
      }),
    );
    await assert.rejects(
      async () => {
        await client.connect();
      },
      (err) => {
        const message = formatConnectionError(err);
        assert.match(message, /接続できません|ECONNREFUSED|timeout|Connection/i);
        return true;
      },
    );
    try {
      await client.end();
    } catch {
      // ignore
    }
  });

  it("errors on missing table", async () => {
    await assert.rejects(
      async () => {
        await withClient(async (client) => {
          await client.query("SELECT * FROM definitely_missing_table_xyz");
        });
      },
      (err) => {
        assert.match(String(err.message), /does not exist|relation/i);
        return true;
      },
    );
  });

  it("errors on invalid SQL syntax", async () => {
    await assert.rejects(
      async () => {
        await withClient(async (client) => {
          await client.query("SELECTTT * FROM authors");
        });
      },
      (err) => {
        assert.match(String(err.message), /syntax error/i);
        return true;
      },
    );
  });

  it("errors on CHECK constraint violation (negative price)", async () => {
    await assert.rejects(
      async () => {
        await withClient(async (client) => {
          await client.query(
            `INSERT INTO books (title, author_id, published_year, price)
             VALUES ('壊れた本', 1, 2026, -10)`,
          );
        });
      },
      (err) => {
        assert.match(String(err.message), /check constraint|violates/i);
        return true;
      },
    );
  });
});
