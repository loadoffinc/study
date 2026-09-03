-- SELECT: 一覧
SELECT b.id, b.title, a.name AS author, b.published_year, b.price
FROM books b
JOIN authors a ON a.id = b.author_id
ORDER BY b.id;

-- INSERT: 1件追加
INSERT INTO books (title, author_id, published_year, price)
VALUES ('坊っちゃん', 1, 1906, 750)
RETURNING id, title;

-- UPDATE: 価格変更
UPDATE books SET price = 800 WHERE title = '坊っちゃん'
RETURNING id, title, price;

-- DELETE: 追加した行を削除
DELETE FROM books WHERE title = '坊っちゃん'
RETURNING id, title;
