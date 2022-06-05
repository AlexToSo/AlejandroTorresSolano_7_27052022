const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Adds a new user to database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.signup = (req, res, next) => {
    // Crypts the new user password
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Saves the new user
            mysql.createConnection({
                host: 'localhost',
                user: process.env.MYSQL_USER,
                database: process.env.MYSQL_DATABASE,
            })
                .then(conn => {
                    conn.query('INSERT INTO user (`email`, `password`) VALUES (?, ?);', [req.body.email, hash])
                        .then(() => res.status(201).json({ message: 'New user created!' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/**
 * Gets an user token from database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.login = (req, res, next) => {
    // Finds the concerning user
    mysql.createConnection({
        host: 'localhost',
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
    })
        .then(conn => {
            conn.query('SELECT * FROM user WHERE email = ?;', [req.body.email])
                .then(result => {
                    const user = result[0][0];
                    if (!user) return res.status(401).json({ error: 'User not found!' })
                    // Otherwise, compares entered and database password
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            // Sends an error if wrong password
                            if (!valid) return res.status(401).json({ error: 'Wrong password!' })
                            // Otherwise, sends authentification information
                            res.status(200).json({
                                user_id: user.id,
                                token: jwt.sign(
                                    { user_id: user.id },
                                    process.env.APP_SECRET,
                                    { expiresIn: '24h' }
                                )
                            });
                        })
                        .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};