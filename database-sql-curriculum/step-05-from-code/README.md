# Step 05: Node.js から SQL を実行する

## 学ぶこと

- `pg` クライアントで接続する
- アプリコードから `SELECT` して結果を表示する

## 対象ファイル

- `src/db.js` … 接続設定・クライアントヘルパ
- `src/run-sql.js` … サンプル実行エントリ

## 手順

```bash
cd database-sql-curriculum
npm run db:init   # まだなら
npm run run:sql
```

出力例:

```text
books (from Node.js):
┌─────────┬────┬────────────────────────┬────────────────┬────────────────┬───────┐
│ (index) │ id │ title                  │ author         │ published_year │ price │
...
count: 4
```

## サンプルコード（抜粋）

```js
const { withClient, formatConnectionError } = require("./db");

const rows = await withClient(async (client) => {
  const result = await client.query(`
    SELECT b.id, b.title, a.name AS author
    FROM books b
    JOIN authors a ON a.id = b.author_id
    ORDER BY b.id
  `);
  return result.rows;
});
console.table(rows);
```

## 正常系

- テーブル形式で書籍一覧が表示される
- `count: 4`

## 異常系

DB 停止中に実行すると接続エラーになります。

```bash
npm run db:down
npm run run:sql
npm run db:up && npm run db:wait
```

## 次へ

[Step 06: 正常系・異常系テスト](../step-06-tests/README.md)
