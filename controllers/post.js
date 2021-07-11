const models = require('../models');
const fs = require('fs');

// création d'un post
exports.createPosts = (req, res, next) =>{
    const postsObject = JSON.parse(req.body.post); // parse en json le corps de la requête
    const posts = new Posts ({ 
        ...postsObject, // fait une copie de tous les éléments de saucesObject puis on ajoute les éléments ci-dessous
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // résoud l'URL complète de notre image
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []

    });
    posts.save() //sauvegarde le post créé
    .then(() => res.status(201).json({ message: 'Post enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};
/*
exports.modifyPosts = (req, res, next) => {
    const postsObject = req.file ? // vérifie si req.file existe, 
    {
      ...JSON.parse(req.body.post), // alors on récupère le corps (req.body.sauce)
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // on modifie notre image
    } : { ...req.body }; // si req.file n'existe pas, alors on copie req.body
    Posts.updateOne({ _id: req.params.id }, { ...postsObject, _id: req.params.id }) // on modifie l'id pour correspondre aux paramètres de la requête
      .then(() => res.status(200).json({ message: 'Post modifié !'}))
      .catch(error => res.status(400).json({ error }));
};
*/
/*
exports.deletePosts = (req, res, next) => {
    Posts.findOne({ _id: req.params.id })
    .then(posts => {
      const filename = posts.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Posts.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(400).json({ error }));
};
*/
exports.findAllPosts = (req, res, next) => {
    models.posts.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
/*
exports.findOneSauces = (req, res, next) => {
    Posts.findOne({ _id: req.params.id })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error }));
};
*/
/*
exports.likeSauces = (req, res, next) =>{
  switch(req.body.like){
    case 0 : Sauces.findOne({ _id: req.params.id })
      .then(sauces => 
        {
          if(sauces.usersLiked.find(user => user === req.body.userId)) {
            Sauces.updateOne({
              _id: req.params.id 
            },{
              $inc:{
                likes: -1
              },
              $pull:{
                usersLiked: req.body.userId
              },
              _id: req.params.id 
            })
            .then(() => res.status(200).json({ message: 'Like supprimé !'}))
            .catch(error => res.status(400).json({ error }));
          }
          if(sauces.usersDisliked.find(user => user === req.body.userId)) {
            Sauces.updateOne({
              _id: req.params.id 
            },{
              $inc:{
                dislikes: -1
              },
              $pull:{
                usersDisliked: req.body.userId
              },
              _id: req.params.id 
            })
            .then(() => res.status(200).json({ message: 'Dislike supprimé !'}))
            .catch(error => res.status(400).json({ error }));
          }

        })
      .catch(error => res.status(404).json({ error: error }));
      break;
    case 1 : Sauces.updateOne({
      _id: req.params.id 
    },{
      $inc:{
        likes: 1
      },
      $push:{
        usersLiked: req.body.userId
      },
      _id: req.params.id 
    })
    .then(() => res.status(200).json({ message: 'Like ajouté !'}))
    .catch(error => res.status(400).json({ error }));
    break;
    case -1 : Sauces.updateOne({
      _id: req.params.id 
    },{
      $inc:{
        dislikes: 1
      },
      $push:{
        usersDisliked: req.body.userId
      },
      _id: req.params.id 
    })
    .then(() => res.status(200).json({ message: 'Dislike ajouté !'}))
    .catch(error => res.status(400).json({ error }));
    break;
    }
  
};
*/
exports.list = ( req, res, next ) => {
  models.posts.findAll({ 
    include: { model: models.users},
    where: { userId:req.params.id},
    order: [["createdAt","DESC"]]
  })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
