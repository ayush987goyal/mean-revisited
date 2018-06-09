const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Post = require('./models/post');

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('Connection to DB failed'));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
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

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'Post deleted successfully!' });
  });
});

module.exports = app;
