const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  console.log(req.body);
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
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); 
};

exports.login = (req, res, next) => {
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
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
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

exports.list = ( req, res, next ) => {
    models.users.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};
