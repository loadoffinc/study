"use strict";

const { Client } = require("pg");
const fs = require("node:fs");
const path = require("node:path");

function loadEnvFile() {
  const envPath = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile();

function getConfig(overrides = {}) {
  return {
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT || 5432),
    user: process.env.PGUSER || "study",
    password: process.env.PGPASSWORD || "study",
    database: process.env.PGDATABASE || "study",
    connectionTimeoutMillis: Number(process.env.PGCONNECT_TIMEOUT || 3000),
    ...overrides,
  };
}

async function withClient(fn, overrides = {}) {
  const client = new Client(getConfig(overrides));
  try {
    await client.connect();
    return await fn(client);
  } finally {
    try {
      await client.end();
    } catch {
      // ignore close errors
    }
  }
}

function formatConnectionError(err) {
  const code = err && err.code;
  if (code === "ECONNREFUSED") {
    return "DBに接続できません（ECONNREFUSED）。`npm run db:up` で PostgreSQL を起動してください。";
  }
  if (code === "ENOTFOUND") {
    return "ホスト名を解決できません。PGHOST を確認してください。";
  }
  return err && err.message ? err.message : String(err);
}

module.exports = {
  getConfig,
  withClient,
  formatConnectionError,
};
