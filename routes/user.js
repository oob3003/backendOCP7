// défini les routes pour créer un user et se connecter

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user', userCtrl.allUsers); // permet d'obtenir la liste des users



module.exports = router; 
