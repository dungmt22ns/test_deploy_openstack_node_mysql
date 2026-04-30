const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 8080;

// DB config
const pool = mysql.createPool({
  host: '192.168.10.213',
  port: 3306,
  user: 'gh_nhuthangl24',
  password: '!Ydi^K&hTtkcgt#(a98)AmSH',
  database: 'gh_nhuthangl24_test',
  waitForConnections: true,
  connectionLimit: 10
});

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');

    const list = rows.map(u => `<li>${u.id} - ${u.name}</li>`).join('');

    res.send(`
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>Thành viên nhóm 8</title>
        </head>
        <body>
          <h1>Thành viên nhóm 8</h1>
          <ul>
            ${list}
          </ul>
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('DB error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
