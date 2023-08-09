const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    res.redirect('/auth/login');
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      // 로그인 성공
      // 세션 등을 설정하고 메인 페이지로 이동
    } else {
      // 로그인 실패
      // 에러 메시지 표시
    }
  });
});

module.exports = router;
