-- 学習用スキーマ: 書籍（books）と著者（authors）
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'JP'
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER NOT NULL REFERENCES authors(id),
  published_year INTEGER,
  price INTEGER NOT NULL CHECK (price >= 0)
);

CREATE INDEX idx_books_author_id ON books(author_id);
