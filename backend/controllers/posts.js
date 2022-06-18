const fs = require('fs');

/**
 * Gets all available posts from database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.getAllPosts = async (req, res, next) => {
    try {
        const [result, fields] = await mysql.query('SELECT post.id, post.text, post.image_url, post.name, user.email FROM post JOIN user ON post.user_id = user.id');
        res.status(200).json(result);
    }
    catch (e) { res.status(500).json({ error: e.message }); }
};

/**
 * Gets one post from database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.getOnePost = async (req, res, next) => {
    try {
        const [post, post_fields] = await mysql.query('SELECT * FROM post WHERE id = ?', [req.params.id]);
        const [likes, likes_fields] = await mysql.query('SELECT * FROM user_post_liked WHERE user_liked_id = ? AND post_id = ?', [req.auth.user_id, req.params.id]);

        const result = (likes[0])
            ? { ...post[0], liked: true }
            : { ...post[0], liked: false }

        res.status(200).json(result);
    }
    catch (e) { res.status(500).json({ error: e.message }) }
};

/**
 * Adds a new post to database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.createPost = async (req, res, next) => {
    console.log(req.body);
    const postObject = req.body.image
        // ? { ...JSON.parse(req.body.post), image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
        ? { ...req.body, image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
        : { ...req.body };

    try {
        await mysql.query('INSERT INTO post (`name`, `text`, `image_url`, `user_id`) VALUES (?, ?, ?, ?);', [postObject.name, postObject.text, postObject.image_url, req.auth.user_id]);
        res.status(200).json({ message: 'Post saved!' });
    }
    catch (e) { res.status(500).json({ error: e.message }) }
};

/**
 * Adds a new post reaction to database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.createPostReaction = async (req, res, next) => {
    try {
        if (req.body.like === 1) {
            await mysql.query('INSERT INTO user_post_liked (`user_liked_id`, `post_id`) VALUES (?, ?);', [req.auth.user_id, req.params.id]);
            res.status(201).json({ message: 'Post like added!' });
        }
        else if (req.body.like === 0) {
            await mysql.query('DELETE FROM user_post_liked WHERE `user_liked_id` = ? AND `post_id` = ?;', [req.auth.user_id, req.params.id]);
            res.status(201).json({ message: 'Post like removed!' });
        }
        else { res.status(400).json({ error: 'Reaction not possible' }) }
    }
    catch (e) { res.status(500).json({ error: e.message }) }
};

/**
 * Modifies an existent post from database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.modifyPost = async (req, res, next) => {
    try {
        const [old_post, old_post_fields] = await mysql.query('SELECT * FROM post WHERE id = ? AND user_id = ?', [req.params.id, req.auth.user_id]);
        if (!old_post[0]) return res.status(401).json({ error: 'Post doesn\'t exists or doesn\'t belong to user' })

        // If the modification contains a new image and the old post already had one, delete it from server
        if (req.file && old_post[0].image_url) {
            const filename = old_post[0].image_url.split('/images/')[1];
            fs.unlinkSync(`images/${filename}`);
        }

        // Creates a new post object to update it 
        const new_post = req.file
            // ? { ...JSON.parse(req.body.post), image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
            ? { ...req.body, image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
            : { ...req.body };
        // Updates the new post
        await mysql.query('UPDATE post SET text = ?, image_url = ? WHERE id = ?', [new_post.text, new_post.image_url, req.params.id]);
        res.status(201).json({ message: 'Post modified!' });
    }
    catch (e) { res.status(500).json({ error: e.message }) }
};

/**
 * Deletes an existent post from database
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
exports.deletePost = async (req, res, next) => {
    try {
        const [old_post, old_post_fields] = await mysql.query('SELECT * FROM post WHERE id = ? AND user_id = ?', [req.params.id, req.auth.user_id]);
        if (!old_post[0]) return res.status(401).json({ error: 'Post doesn\'t exists or doesn\'t belong to user' })

        // If the old post had an image, delete it from server
        if (old_post.image_url) {
            const filename = old_post.image_url.split('/images/')[1];
            fs.unlinkSync(`images/${filename}`);
        }

        // Deletes the post
        await mysql.query('DELETE FROM post WHERE id = ?', [req.params.id]);
        res.status(201).json({ message: 'Post deleted!' });
    }
    catch (e) { res.status(500).json({ error: e.message }) }
};