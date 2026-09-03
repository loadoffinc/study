# Step 01: Docker で PostgreSQL を起動する

## 学ぶこと

- `docker compose` で学習用 DB を立ち上げる
- コンテナの状態確認と停止

## 手順

1. このカリキュラムのルートへ移動する

```bash
cd database-sql-curriculum
```

2. 環境変数ファイルを用意する

```bash
cp .env.example .env
```

3. DB を起動する

```bash
npm run db:up
# または: docker compose up -d
```

4. 起動確認

```bash
docker compose ps
```

`db` サービスが `running`（health: healthy）になれば OK です。

## 正常系チェック

- `docker compose ps` で `study-sql-curriculum-db` が表示される
- ポート `5432` がホストに公開されている

## 異常系チェック

- Docker が起動していない場合、`docker compose up` が失敗する
- すでに別プロセスが `5432` を使っている場合、ポート衝突で起動に失敗する

→ 衝突時は `docker-compose.yml` の ports を `"5433:5432"` などに変更し、`.env` の `PGPORT` も合わせてください。

## 次へ

[Step 02: 接続を確認する](../step-02-connect/README.md)
