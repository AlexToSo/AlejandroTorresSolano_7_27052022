const express = require('express');
const mongoose = require('mongoose');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');
require('dotenv').config();

// Creation of an express app
const app = express();

// POST routes
app.use(express.json());

// Connection to MongoDB server
mongoose.connect('mongodb+srv://AlexToSo:a0Yyfch9AgJaN2dP@cluster0.rndlm.mongodb.net/groupomnia?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connection to MongoDB successful!'))
  .catch(() => console.log('Connection to MongoDB unsuccessful!'));

// CORS security
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postsRoutes);
app.use('/api/auth', userRoutes);

// Express app export to use in server.js
module.exports = app;