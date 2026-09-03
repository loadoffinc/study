# Step 06: 正常系・異常系テスト

## 学ぶこと

- Node 組み込みの `node:test` で検証する
- 正常系と異常系を分けて確認する

## 対象ファイル

- `tests/normal.test.js`
- `tests/error.test.js`

## 手順

```bash
cd database-sql-curriculum
npm run db:up
npm run db:wait
npm run db:init
npm test
```

個別実行:

```bash
npm run test:normal
npm run test:error
```

## テスト観点

### 正常系 (`normal.test.js`)

- 接続できる（`SELECT 1`）
- シード件数が期待どおり（authors=3, books=4）
- JOIN で著者名が取れる
- INSERT / UPDATE / DELETE が動く

### 異常系 (`error.test.js`)

- 閉じたポートへの接続が失敗する
- 存在しないテーブル参照でエラー
- 不正 SQL 文法で syntax error
- 負の `price` で CHECK 制約違反

## 正常系チェック

`npm test` が exit code 0 で完了すること。

## 異常系チェック

異常系テストは「エラーが起きることを assert」します。  
テスト自体はパスし、アプリ側の失敗ケースが意図どおりであることを確認します。

## 後片付け

```bash
npm run db:down
# データも消す場合:
# docker compose down -v
```
