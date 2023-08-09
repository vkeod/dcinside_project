const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM posts';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('posts', { posts: results });
  });
});

router.get('/create', (req, res) => {
  res.render('create_post');
});

router.post('/create', (req, res) => {
  const { title, content } = req.body;
  const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  db.query(sql, [title, content], (err, result) => {
    if (err) throw err;
    res.redirect('/posts');
  });
});

router.get('/:id/edit', (req, res) => {
  const postId = req.params.id;
  const sql = 'SELECT * FROM posts WHERE id = ?';
  db.query(sql, [postId], (err, results) => {
    if (err) throw err;
    res.render('edit_post', { post: results[0] });
  });
});

router.post('/:id/edit', (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
  db.query(sql, [title, content, postId], (err, result) => {
    if (err) throw err;
    res.redirect('/posts');
  });
});

router.post('/:id/delete', (req, res) => {
  const postId = req.params.id;
  const sql = 'DELETE FROM posts WHERE id = ?';
  db.query(sql, [postId], (err, result) => {
    if (err) throw err;
    res.redirect('/posts');
  });
});

router.get('/:id', (req, res) => {
  const postId = req.params.id;
  const sql = 'SELECT * FROM posts WHERE id = ?';
  db.query(sql, [postId], (err, results) => {
    if (err) throw err;
    res.render('post', { post: results[0] });
  });
});

module.exports = router;
