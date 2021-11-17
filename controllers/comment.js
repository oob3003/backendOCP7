const models = require('../models');
const fs = require('fs');

// création d'un comment
exports.createComments = (req, res, next) =>{
    models.comments.create({
      title: req.body.title,
      content: req.body.content,
      visible: "",
      postId: req.body.postId,
      userId: req.body.userId //token
    })
    .then(() => res.status(201).json({ message: 'Comment enregistré !'}))
    .catch(error => res.status(400).json({ error: "ouch" }));
};
// checkbox Comment
exports.modifyCheckComment = (req, res, next) =>{
  console.log(req.body.visible)
  models.comments.update({
    visible: req.body.visible
  } ,
    {where:{id: req.params.id}}
  )
  .then(() => res.status(200).json({ message: 'Comment visible(1) ou pas(0) !'}))
  .catch(error => res.status(400).json({ error }));
};
// récupérer tous les comments
exports.findAllComments = (req, res, next) => {
  models.comments.findAll({
    include: models.posts,
    include: models.users, 
  })   
      .then(comments => res.status(200).json(comments))
      .catch(error => res.status(400).json({ error }));
};
// extraire tous les commentaires classés par post
exports.findAllCommentsValidatedForOnePost = (req, res, next) => {
  console.log("OK");
    models.comments.findAll({
      include: models.users,
      include: models.posts ,
      where: { postId:req.params.id,visible:1},
      order: [["createdAt","DESC"]]
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error: blabla }));
};
