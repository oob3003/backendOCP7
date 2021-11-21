const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

// déposer un nouveau comment
router.post('/',auth,commentCtrl.createComments); 
// traitement de la coche "visible"
router.put('/:id',auth,commentCtrl.modifyCheckComment); 
// récup ts comments pour un post
router.get('/allCommentsForOnePost/:id',auth,commentCtrl.findAllCommentsValidatedForOnePost);
// récupérer tous les comments
router.get('/',auth,commentCtrl.findAllComments);
module.exports = router;