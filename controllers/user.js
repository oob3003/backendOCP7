const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');

const passwordValidator = require('password-validator');
 
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
        status: 0
      })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); 
  }else{
    res.status(400).json({erreur:'mot de passe non conforme! Doit contenir 8 caractères avec une majuscule, une minuscule et pas d \'espace'})
  }
};

exports.login = (req, res, next) => {
    let admin;
    models.users.findOne({where: { email: req.body.email }})
    .then(user => { 
      console.log(user.password)
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }

    console.log(req.body.password)
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          console.log(valid)
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          //si user.status === 2, c'est qu'il s'agit de l'admin
          if(user.status === 2){
            admin = 1  // true
          //si user.status === 1, c'est un utilisateur autorisé
          }else if(user.status ===1){
            admin = 0  // false
          //sinon, l'utilisateur doit créer son compte et le soumettre
          }else{ 
            return alert("Merci de soumettre votre demande d'accès en créant votre compte")
          }
          res.status(200).json({
            admin: admin,
            status:user.status,
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

exports.allUsers = ( req, res, next ) => {
    models.users.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
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