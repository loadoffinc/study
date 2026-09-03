# Database → SQL 実行カリキュラム

データベースの立ち上げから、SQL の実行、Node.js からの呼び出しまでを **step by step** で学ぶ教材です。

## ゴール

- Docker で PostgreSQL を起動できる
- SQL でテーブル作成・初期データ投入・CRUD ができる
- Node.js（`pg`）から SQL を実行できる
- 正常系・異常系のテストで動作を確認できる

## 前提

- Docker / Docker Compose
- Node.js 18 以上
- （任意）`psql` クライアント

## 進め方（推奨順）

1. [Step 01: DB を起動する](./step-01-setup/README.md)
2. [Step 02: 接続を確認する](./step-02-connect/README.md)
3. [Step 03: スキーマと初期データ](./step-03-schema/README.md)
4. [Step 04: CRUD SQL](./step-04-crud/README.md)
5. [Step 05: Node.js から SQL を実行](./step-05-from-code/README.md)
6. [Step 06: 正常系・異常系テスト](./step-06-tests/README.md)

## クイックスタート

```bash
cd database-sql-curriculum
cp .env.example .env
npm install
npm run db:up
npm run db:wait
npm run db:init
npm run run:sql
npm test
```

## 既定の接続情報

| 項目 | 値 |
|---|---|
| host | localhost |
| port | 5432 |
| user | study |
| password | study |
| database | study |

## ディレクトリ構成

```text
database-sql-curriculum/
  docker-compose.yml
  package.json
  .env.example
  sql/                 # schema / seed / crud
  src/                 # Node.js サンプル
  tests/               # 正常系・異常系
  step-0N-*/README.md  # 各ステップの解説
```
