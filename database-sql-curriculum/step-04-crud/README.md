# Step 04: SELECT / INSERT / UPDATE / DELETE

## 学ぶこと

- 基本的な CRUD SQL
- JOIN による結合取得
- `RETURNING` で結果をその場で確認する

## 対象ファイル

- `sql/crud.sql`

## 手順（psql）

```bash
cd database-sql-curriculum
psql "postgresql://study:study@localhost:5432/study" -f sql/crud.sql
```

## 手順（Node で確認）

`crud.sql` は複数文のため、学習用には `psql` 実行を推奨します。  
同等の操作はテスト `tests/normal.test.js` の INSERT/UPDATE/DELETE ケースでも確認できます。

```bash
npm run test:normal
```

## SQL のポイント

1. **SELECT + JOIN** … 本と著者名を一緒に取る  
2. **INSERT ... RETURNING** … 追加結果を返す  
3. **UPDATE ... RETURNING** … 更新後の値を返す  
4. **DELETE ... RETURNING** … 削除した行を返す  

## 正常系

- JOIN 結果に `こころ` / `夏目漱石` が含まれる
- INSERT → UPDATE → DELETE が一連で成功する

## 異常系

負の価格を入れると CHECK 制約で失敗します。

```sql
INSERT INTO books (title, author_id, published_year, price)
VALUES ('壊れた本', 1, 2026, -10);
```

## 次へ

[Step 05: Node.js から SQL を実行](../step-05-from-code/README.md)
