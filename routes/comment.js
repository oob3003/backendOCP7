const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');


// déposer un nouveau comment
router.post('/',  commentCtrl.createComments); //auth, multer,

// récupérer tous les comments
router.get('/:id', commentCtrl.findAllComments);
//router.get('/latestPosts', postCtrl.findAllPostsByDate);
module.exports = router;