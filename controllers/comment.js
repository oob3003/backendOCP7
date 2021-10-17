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
  .then(() => res.status(200).json({ message: 'Comment visible !'}))
  .catch(error => res.status(400).json({ error }));
};
// récupérer tous les comments
exports.findAllComments = (req, res, next) => {
  models.comments.findAll()   
      .then(comments => res.status(200).json(comments))
      .catch(error => res.status(400).json({ error }));
};
// extraire tous les commentaires classés par post
exports.findAllCommentsValidatedForOnePost = (req, res, next) => {
  console.log("OK");
    models.comments.findAll({
      include: models.posts , //modif du 13/10,
      where: { postId:req.params.id},
      order: [["createdAt","DESC"]]
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error: blabla }));
};

// exports.findAllCommentsValidated = (req, res, next) => {
//   models.comments.findAll({
//     where:{visible:1},
//     order:[["updatedAt","DESC"]],
//   })
//       .then(comments => res.status(200).json(comments))
//       .catch(error => res.status(400).json({ error }));
// };

// exports.allCommentsByPost = ( req, res, next ) => {
//     models.comments.findAll({ 
//       include: { model: models.users},
//       where: { userId:req.params.id},
//       order: [["createdAt","DESC"]]
//     })
//         .then(comments => res.status(200).json({ message: 'Liste des comments !'}))//.then(comments => res.status(200).json(comments))
//         .catch(error => res.status(400).json({ error }));
//   };