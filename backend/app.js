const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Post = require('./models/post');

const app = express();
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('Connection to DB failed'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = Post.find({}).then(docs => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: docs
    });
  });
});

module.exports = app;
