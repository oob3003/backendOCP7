const models = require('../models');
const fs = require('fs');

// création d'un comment
exports.createComments = (req, res, next) =>{
    const commentsObject = JSON.parse(req.body.comment); // parse en json le corps de la requête
    const comments = new Comments ({ 
        ...commentsObject, // fait une copie de tous les éléments de commentsObject puis on ajoute les éléments ci-dessous
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // résoud l'URL complète de notre image
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []

    });
    comments.save() //sauvegarde le comment créé
    .then(() => res.status(201).json({ message: 'Comment enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.allUsers = ( req, res, next ) => {
    models.comments.findAll({ 
      include: { model: models.users},
      where: { userId:req.params.id},
      order: [["createdAt","DESC"]]
    })
        .then(comments => res.status(200).json({ message: 'Liste des comments !'}))//.then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
  };