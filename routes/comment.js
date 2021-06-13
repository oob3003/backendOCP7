const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// récupérer un post en particulier
router.get('/:id', auth, commentCtrl.getOnePosts);

// déposer un nouveau comment
router.post('/', auth, multer, commentCtrl.createComments); 