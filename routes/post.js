const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');


// déposer un nouveau post
router.post('/', postCtrl.createPosts); 

// traitement de la coche "visible"
router.put('/:id', postCtrl.modifyCheckPost); 
 
// modifier un post
//router.put('/:id', auth, multer, postCtrl.modifyPosts); 
// supprimer un post
//router.delete('/:id', auth, postCtrl.deletePosts);

// récupérer tous les posts
router.get('/', postCtrl.findAllPosts);

//récupérer les posts validés par l'admin
router.get('/wallOfPosts', postCtrl.findAllPostsValidated)

//récupérer les X derniers posts
router.get('/latestsPosts', postCtrl.findAllPostsByDate);

// récupérer un post en particulier
router.get('/:id', postCtrl.findOnePosts);

// traitement des likes
//router.post('/:id/like', auth, stuffCtrl.likePosts); 

//router.get('/list/:id', postCtrl.list);

module.exports = router;