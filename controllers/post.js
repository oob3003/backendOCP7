const models = require('../models');
const fs = require('fs');
// création d'un post
exports.createPosts = (req, res, next) =>{
    models.posts.create({
      title: req.body.title,
      content: req.body.content,
      visible: 0,
      userId: req.body.userId
    })
    .then(() => res.status(201).json({ message: 'Post enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.findAllPosts = (req, res, next) => {
    models.posts.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.findAllPostsByDate = (req, res, next) => {
  models.posts.findAll({
    where:{visible:1},
    order:[["updatedAt","DESC"]],
    limit: 4
  })
      .then(posts => res.status(200).json(posts))
      .catch(error => res.status(400).json({ error }));
};

exports.findOnePosts = (req, res, next) => {
    models.posts.findOne({ 
      where:{id: req.params.id}

    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error }));
};


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
