# Step 02: 接続を確認する

## 学ぶこと

- PostgreSQL への接続確認
- 接続失敗時のエラーメッセージの読み方

## 手順

依存関係を入れてから、待機スクリプトで接続できるまで待ちます。

```bash
cd database-sql-curriculum
npm install
npm run db:wait
```

成功すると次のように表示されます。

```text
DB is ready (attempt 1/30)
```

### psql がある場合（任意）

```bash
psql "postgresql://study:study@localhost:5432/study" -c 'SELECT version();'
```

## サンプルコード

接続ヘルパは `src/db.js` です。接続エラーは `formatConnectionError` で分かりやすい文言にします。

```js
const { withClient, formatConnectionError } = require("../src/db");

withClient(async (client) => {
  const res = await client.query("SELECT 1 AS ok");
  console.log(res.rows[0]);
}).catch((err) => {
  console.error(formatConnectionError(err));
});
```

## 正常系

- `npm run db:wait` が成功する
- `SELECT 1` が通る

## 異常系

DB を止めてから再実行すると、接続エラーになります。

```bash
npm run db:down
npm run db:wait
```

期待メッセージ例:

```text
DBに接続できません（ECONNREFUSED）。`npm run db:up` で PostgreSQL を起動してください。
```

確認後は再度起動してください。

```bash
npm run db:up && npm run db:wait
```

## 次へ

[Step 03: スキーマと初期データ](../step-03-schema/README.md)
