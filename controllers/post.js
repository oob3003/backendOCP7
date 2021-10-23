const models = require('../models');
const fs = require('fs');
// création d'un post
exports.createPosts = (req, res, next) =>{
    models.posts.create({
      title: req.body.title,
      content: req.body.content,
      visible: "",
      userId: req.body.userId
    })
    .then(() => res.status(201).json({ message: 'Post enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyCheckPost = (req, res, next) =>{
  console.log(req.body.visible)
  models.posts.update({
    visible: req.body.visible
  } ,
    {where:{id: req.params.id}}
  )
  .then(() => res.status(200).json({ message: 'Post visible(1) ou pas(0) !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.findAllPosts = (req, res, next) => {
    models.posts.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.findAllPostsValidated = (req, res, next) => {
  models.posts.findAll({
    where:{visible:1},
    order:[["updatedAt","DESC"]],
  })
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