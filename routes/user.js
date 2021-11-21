// défini les routes pour créer un user et se connecter

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);
router.get('/user',auth,userCtrl.allUsers); // permet d'obtenir la liste des users
router.put('/user/:id',auth,userCtrl.modifyCheckUser); // permet la validation de l'utilisateur
router.get('/user/:id',auth,userCtrl.findOneUserValidated);// récupération d'un utilisateur
router.put('/user/addUserPhoto/:id',auth,multer,userCtrl.modifyPhotoUser); // permet d'afficher la photo de l'utilisateur
router.delete('/user/:id',auth,userCtrl.deleteUser);
module.exports = router; 
