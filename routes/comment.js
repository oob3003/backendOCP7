const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');


// déposer un nouveau comment
router.post('/',  commentCtrl.createComments); //auth, multer,

// traitement de la coche "visible"
router.put('/:id', commentCtrl.modifyCheckComment); 

// récup ts comments pour un post
router.get('/allCommentsForOnePost/:id', commentCtrl.findAllCommentsValidatedForOnePost);

// récupérer tous les comments
router.get('/', commentCtrl.findAllComments);
//router.get('/latestPosts', postCtrl.findAllPostsByDate);
module.exports = router;