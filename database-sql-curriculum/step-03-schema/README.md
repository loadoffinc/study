# Step 03: テーブル作成・初期データ

## 学ぶこと

- `CREATE TABLE` でスキーマを定義する
- `INSERT` でシードデータを入れる
- SQL ファイルを Node から適用する

## 対象ファイル

- `sql/schema.sql` … authors / books テーブル
- `sql/seed.sql` … 初期データ
- `src/apply-sql.js` … SQL ファイル適用ユーティリティ

## 手順

```bash
cd database-sql-curriculum
npm run db:init
```

内部では次を実行しています。

```bash
node src/apply-sql.js sql/schema.sql
node src/apply-sql.js sql/seed.sql
```

## スキーマ概要

```text
authors (id, name, country)
books   (id, title, author_id -> authors.id, published_year, price)
```

`price` には `CHECK (price >= 0)` 制約があります（異常系テストで使います）。

## 正常系

```bash
# 件数確認（Node）
node -e 'const {withClient}=require("./src/db"); withClient(async c=>{console.log((await c.query("SELECT COUNT(*)::int AS c FROM books")).rows[0]);});'
```

`c: 4` になればシード成功です。

## 異常系

存在しない SQL ファイルを指定すると失敗します。

```bash
node src/apply-sql.js sql/does-not-exist.sql
```

## 次へ

[Step 04: CRUD SQL](../step-04-crud/README.md)
