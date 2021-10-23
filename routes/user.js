// défini les routes pour créer un user et se connecter

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('multer');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user', userCtrl.allUsers); // permet d'obtenir la liste des users
router.get('/user/:id', userCtrl.findOneUserValidated);// récupération d'un utilisateur
// router.get('/allUsers', userCtrl.findAllUsersValidated);
router.put('/user/:id', userCtrl.modifyCheckUser); // permet la validation de l'utilisateur
router.put('/user/addUserPhoto/:id', multer, userCtrl.modifyPhotoUser); // permet d'afficher la photo de l'utilisateur
router.delete('/user/:id', userCtrl.deleteUser);
module.exports = router; 
