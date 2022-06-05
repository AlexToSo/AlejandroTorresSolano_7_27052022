const jwt = require('jsonwebtoken');

/**
 * Verifies user authentification
 * @param { Object } req
 * @param { Object } res
 * @param { Method } next
 */
module.exports = (req, res, next) => {
    try {
        // Gets the token authentification and decodes the user ID
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.APP_SECRET);
        const user_id = decodedToken.user_id;
        // Compares the decoded ID with the real one
        if (req.body.user_id && req.body.user_id !== user_id) { throw 'Invalid user ID' }
        else { next() }
    } catch (e) {
        res.status(403).json({ error: e.message });
    }
};