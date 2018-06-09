const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'post1',
      title: 'First server-side post',
      content: 'This is coming from server'
    },
    {
      id: 'post2',
      title: 'Second server-side post',
      content: 'This is coming from server!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts
  });
});

module.exports = app;
