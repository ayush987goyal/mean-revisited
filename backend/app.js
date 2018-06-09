const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const postsRoutes = require('./routes/posts');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/posts', postsRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('Connection to DB failed'));

module.exports = app;
