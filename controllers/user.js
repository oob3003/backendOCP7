const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');

const passwordValidator = require('password-validator');
const { resource } = require('../app');
 
// Create a schema
var schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
//.has().digits(2)                              // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces

exports.signup = (req, res, next) => {
  console.log(req.body);
  if(schema.validate(req.body.password)){
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = models.users.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        status: 0,
      })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); 
  }else{
    res.status(400).json({erreur:'mot de passe non conforme! Doit contenir 8 caractères avec une majuscule, une minuscule et pas d \'espace'})
  }
};

// exports.modifyCheckUser = (req, res, next) =>{
//   console.log(req.body.visible)
//   models.users.update({
//     visible: req.body.visible
//   } ,
//     {where:{id: req.params.id}}
//   )
//   .then(() => res.status(200).json({ message: 'Utilisateur visible !'}))
//   .catch(error => res.status(400).json({ error }));
// };

// login
exports.login = (req, res, next) => {
    let admin;
    models.users.findOne({where: { email: req.body.email }} && {where: { firstname: req.body.firstname }})  // vérif email et firstname
    .then(user => { 
      console.log(user.password)
      if (!user) {
        return res.status(401).json({ "error": "true", "msg": 'Utilisateur non trouvé !' });
      }

    console.log(req.body.password)
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          console.log(valid)
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          //si user.status === 2 , c'est qu'il s'agit de l'admin
          if(user.status === 2){
            admin = 1  // true
          //si user.status === 1, c'est un utilisateur autorisé
          }else if(user.status === 1){
            admin = 0  // false
          //si user.status === 0, c'est un utilisateur en attente d'autorisation
          }else if(user.status === 0){
            return alert("Votre demande d'accès en cours de validation par l'administrateur")
          //sinon, l'utilisateur doit créer son compte et le soumettre
          }else{ 
            return alert("Merci de soumettre votre demande d'accès en créant votre compte")
          }
          res.status(200).json({
            admin: admin,
            status: user.status,
            userId: user.id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN', // à modifier pour sécuriser
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// validation status via Checkbox
exports.modifyCheckUser = (req, res, next) =>{
  console.log(req.body.status)
  models.users.update({
    status: req.body.status,
    // visible: req.body.visible
  } ,
    {where:{id: req.params.id}}
  )
  .then(() => res.status(200).json({ message: 'Utilisateur visible !'}))
  .catch(error => res.status(400).json({ error }));
};


exports.allUsers = ( req, res, next ) => {
    models.users.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

exports.findAllUsersValidated = (req, res, next) => {
  models.users.findAll({
    where:{status: 1 || 2},
    order:[["updatedAt","DESC"]],

  })
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
};

// trouver un utilisateur
exports.findOneUserValidated = ( req, res, next ) => {
  console.log(req.params.id);
  models.users.findOne({
    where:{ id:req.params.id }
  })
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
};

// supprimer un utilisateur
exports.deleteUser = ( req, res ) => {
  models.users.destroy({
    where: { id: req.params.id}
  })
    .then(function(rowDeleted){
      if(rowDeleted === 1){
        res.status(202).json({message:"deleted successfully"});
        console.log('Utilisateur supprimé');
      }
      else
      {
        res.status(404).json({message:"user not found"})
      } 
    })
    .catch(function(error){
      res.status(500).json(error)
    })
};


exports.list = ( req, res, next ) => {
  models.users.findAll({ 
    //include: { model: models.users},
    where: { userId:req.params.id},
    order: [["createdAt","DESC"]]
  })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};