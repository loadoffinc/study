"use strict";

const { describe, it, before } = require("node:test");
const assert = require("node:assert/strict");
const { withClient } = require("../src/db");
const fs = require("node:fs");
const path = require("node:path");

async function applySql(relative) {
  const sql = fs.readFileSync(path.join(__dirname, "..", relative), "utf8");
  await withClient(async (client) => {
    await client.query(sql);
  });
}

describe("normal cases", () => {
  before(async () => {
    await applySql("sql/schema.sql");
    await applySql("sql/seed.sql");
  });

  it("connects and runs SELECT 1", async () => {
    const value = await withClient(async (client) => {
      const res = await client.query("SELECT 1 AS ok");
      return res.rows[0].ok;
    });
    assert.equal(value, 1);
  });

  it("has seeded authors and books", async () => {
    const counts = await withClient(async (client) => {
      const authors = await client.query("SELECT COUNT(*)::int AS c FROM authors");
      const books = await client.query("SELECT COUNT(*)::int AS c FROM books");
      return { authors: authors.rows[0].c, books: books.rows[0].c };
    });
    assert.equal(counts.authors, 3);
    assert.equal(counts.books, 4);
  });

  it("joins books with authors", async () => {
    const rows = await withClient(async (client) => {
      const res = await client.query(`
        SELECT b.title, a.name AS author
        FROM books b
        JOIN authors a ON a.id = b.author_id
        WHERE b.title = 'こころ'
      `);
      return res.rows;
    });
    assert.equal(rows.length, 1);
    assert.equal(rows[0].author, "夏目漱石");
  });

  it("supports INSERT / UPDATE / DELETE", async () => {
    await withClient(async (client) => {
      const inserted = await client.query(
        `INSERT INTO books (title, author_id, published_year, price)
         VALUES ('テスト本', 1, 2026, 100)
         RETURNING id, title, price`,
      );
      const id = inserted.rows[0].id;
      assert.equal(inserted.rows[0].title, "テスト本");

      const updated = await client.query(
        `UPDATE books SET price = 200 WHERE id = $1 RETURNING price`,
        [id],
      );
      assert.equal(updated.rows[0].price, 200);

      const deleted = await client.query(
        `DELETE FROM books WHERE id = $1 RETURNING id`,
        [id],
      );
      assert.equal(deleted.rows[0].id, id);
    });
  });
});
