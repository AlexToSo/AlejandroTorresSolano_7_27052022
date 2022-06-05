const mysql = require('mysql2/promise');
const fs = require('fs');

/**
 * Gets all available posts from database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.getAllPosts = (req, res, next) => {
    // Connection to mySQL database (il existe aussi createPool: différences????)
    // Faut-il libérer la connection à la fin?
    // Aussi, voir comment faire avec async / await
    mysql.createConnection({
        host: 'localhost',
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
    })
        .then(conn => {
            conn.query('SELECT * FROM post')
                .then(result => res.status(200).json(result[0]))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/**
 * Gets one post from database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.getOnePost = (req, res, next) => {
    // Connection to mySQL database
    mysql.createConnection({
        host: 'localhost',
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
    })
        // Finds and sends the required post
        .then(conn => {
            // conn.query('SELECT * FROM post JOIN user_post_liked ON (post.id = user_post_liked.post_id) WHERE post.id = ?', [req.params.id])
            conn.query('SELECT * FROM post WHERE id = ?', [req.params.id])
                .then(post => {
                    conn.query('SELECT * FROM user_post_liked WHERE user_liked_id = ? AND post_id = ?', [req.body.user_id, req.params.id])
                        .then(likes => {
                            const result = (likes[0][0])
                                ? {
                                    ...post[0][0],
                                    liked: true
                                }
                                : {
                                    ...post[0][0],
                                    liked: false
                                }
                            res.status(200).json(result);
                        })
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/**
 * Adds a new post to database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.createPost = (req, res, next) => {

    // Creates a new post object to save it
    const postObject = req.file
        ? {
            ...JSON.parse(req.body.post),
            image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        : { ...req.body };

    // Saves the new post
    mysql.createConnection({
        host: 'localhost',
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
    })
        .then(conn => {
            conn.query('INSERT INTO post (`text`, `image_url`, `user_id`) VALUES (?, ?, ?);', [postObject.text, postObject.image_url, postObject.user_id])
                .then(() => res.status(201).json({ message: 'Post saved!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/**
 * Adds a new post reaction to database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.createPostReaction = (req, res, next) => {

    // Saves the new post reaction
    mysql.createConnection({
        host: 'localhost',
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
    })
        .then(conn => {
            if (req.body.like === 1) {
                conn.query('INSERT INTO user_post_liked (`user_liked_id`, `post_id`) VALUES (?, ?);', [req.body.user_id, req.params.id])
                    .then(() => res.status(201).json({ message: 'Post like added!' }))
                    .catch(error => res.status(400).json({ error }));
            }
            else if (req.body.like === 0) {
                conn.query('DELETE FROM user_post_liked WHERE `user_liked_id` = ? AND `post_id` = ?;', [req.body.user_id, req.params.id])
                    .then(() => res.status(201).json({ message: 'Post like removed!' }))
                    .catch(error => res.status(400).json({ error }));
            }
            else { res.status(400).json({ error: 'Reaction not possible' }) }

        })
        .catch(error => res.status(500).json({ error }));
};

/**
 * Modifies an existent post from database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.modifyPost = (req, res, next) => {
    // Finds the concerning post
    mysql.createConnection({
        host: 'localhost',
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
    })
        .then(conn => {
            conn.query('SELECT * FROM post WHERE id = ? AND user_id = ?', [req.params.id, req.body.user_id])
                .then(result => {
                    const old_post = result[0][0];
                    if (!old_post) return res.status(401).json({ error: 'Post doesn\'t exists or doesn\'t belong to user' })

                    // If the modification contains a new image and the old post already had one, delete it from server
                    if (req.file && old_post.image_url) {
                        const filename = old_post.image_url.split('/images/')[1];
                        fs.unlinkSync(`images/${filename}`);
                    }

                    // Creates a new post object to update it 
                    const new_post = req.file
                        ? {
                            ...JSON.parse(req.body.post),
                            image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        }
                        : { ...req.body };
                    // Updates the new post
                    conn.query('UPDATE post SET text = ?, image_url = ? WHERE id = ?', [new_post.text, new_post.image_url, req.params.id])
                        .then(() => res.status(200).json({ message: 'Post modified!' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/**
 * Deletes an existent post from database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.deletePost = (req, res, next) => {
    // Finds the concerning post
    mysql.createConnection({
        host: 'localhost',
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
    })
        .then(conn => {
            conn.query('SELECT * FROM post WHERE id = ? AND user_id = ?', [req.params.id, req.body.user_id])
                .then(result => {
                    const old_post = result[0][0];
                    if (!old_post) return res.status(401).json({ error: 'Post doesn\'t exists or doesn\'t belong to user' })

                    // If the old post had an image, delete it from server
                    if (old_post.image_url) {
                        const filename = old_post.image_url.split('/images/')[1];
                        fs.unlinkSync(`images/${filename}`);
                    }

                    // Deletes the post
                    conn.query('DELETE FROM post WHERE id = ?', [req.params.id])
                        .then(() => res.status(200).json({ message: 'Post deleted!' }))
                        .catch(error => res.status(400).json({ error }));

                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};