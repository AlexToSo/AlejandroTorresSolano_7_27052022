const express = require('express');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config();

// Creation of an express app
const app = express();

// POST routes
app.use(express.json());

// Connection to mySQL database (il existe aussi createPool: différences????)
// JE NE PEUX PAS RÉALISER LA CONNECTION ICI CAR JE NE PEUX PAS L'UTILISER AILLEURS
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: process.env.MYSQL_USER,
//   database: process.env.MYSQL_DATABASE,
// })
//   .then(() => console.log('Connection to mySQL successful!'))
//   .catch(() => console.log('Connection to mySQL unsuccessful!'));
// mysql.createConnection({
//   host: 'localhost',
//   user: 'user',
//   database: 'groupomania',
// })
//   .then((conn) => {
//       const post = conn.query('SELECT * FROM user');
//       conn.release();
//       console.log(post)
//   })
//   .catch((error) => console.log(error));



// NE FONCTIONNE PAS CAR TABLE DEJA CREEE
// try {
//   // User table creation in DataBase
//   pool.query('CREATE TABLE user (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(100) NOT NULL)',
//     function (err) {
//       if (err) throw err;
//     });
// }
// catch (e) {
//   console.error(e);
// }

// NE FONCTIONNE PAS CAR TABLE DEJA CREEE
// try {
//   // Post table creation in DataBase
//   pool.query('CREATE TABLE post (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, text VARCHAR(500) NOT NULL, image_url VARCHAR(255), user_id INT NOT NULL)',
//     function (err) {
//       if (err) throw err;
//     });
// }
// catch (e) {
//   console.error(e);
// }





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

// module.exports = pool;