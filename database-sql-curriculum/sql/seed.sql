-- 初期データ
TRUNCATE books, authors RESTART IDENTITY CASCADE;

INSERT INTO authors (name, country) VALUES
  ('夏目漱石', 'JP'),
  ('芥川龍之介', 'JP'),
  ('Jane Austen', 'UK');

INSERT INTO books (title, author_id, published_year, price) VALUES
  ('吾輩は猫である', 1, 1905, 880),
  ('こころ', 1, 1914, 770),
  ('羅生門', 2, 1915, 660),
  ('Pride and Prejudice', 3, 1813, 1200);
