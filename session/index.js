const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();
const port = 3333;

// セッション設定
app.use(session({
  store: new FileStore(), // ファイルベースのセッションストア
  secret: 'your-secret-key', // セッションIDを暗号化するための秘密鍵
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // HTTPSを使用していない場合はfalse
}));

// セッションカウンターの例
app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++
    res.send(`<p>このページを ${req.session.views} 回訪問しました。</p>`)
  } else {
    req.session.views = 1
    res.send('このページを初めて訪問しました！')
  }
});

app.listen(port, () => {
  console.log(`サーバーがポート ${port} で起動しました`);
});
