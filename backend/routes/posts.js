const express = require('express');
const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();

// Gets all posts
router.get('/', auth, postsCtrl.getAllPosts);

// Gets a single post
router.get('/:id', auth, postsCtrl.getOnePost);

// Posts a post
router.post('/', auth, multer, postsCtrl.createPost);

// Posts a reaction
router.post('/:id/like', auth, postsCtrl.createPostReaction);

// Modifies a post
router.put('/:id', auth, multer, postsCtrl.modifyPost);

// Deletes a post
router.delete('/:id', auth, postsCtrl.deletePost);

module.exports = router;