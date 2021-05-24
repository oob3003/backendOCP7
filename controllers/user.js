const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const passwordValidator = require('password-validator');
 
// Create a schema
var schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(6)                                    // Minimum length 6
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
//.has().digits(2)                              // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces

exports.signup = (req, res, next) => {
  if(schema.validate(req.body.password)){
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  }else{
    res.status(400).json({error:'mot de passe non conforme! Doit contenir entre 6 et 100 caractères avec une majuscule, une minuscule et pas d \'espace'})
  }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
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

