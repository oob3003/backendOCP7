const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

router.post('/',auth,postCtrl.createPosts); // déposer un nouveau post
router.put('/:id',auth,postCtrl.modifyCheckPost); // traitement de la coche "visible"
router.get('/',auth,postCtrl.findAllPosts); // récupérer tous les posts
router.get('/wallOfPosts',auth,postCtrl.findAllPostsValidated); //récupérer les posts validés par l'admin
router.get('/latestsPosts',auth,postCtrl.findAllPostsByDate); //récupérer les X derniers posts
router.get('/:id',auth,postCtrl.findOnePosts); // récupérer un post en particulier
module.exports = router;
