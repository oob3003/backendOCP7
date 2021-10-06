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
    .catch(error => res.status(400).json({ error }));
};
// extraire tous les commentaires
exports.findAllCommentsByPost = (req, res, next) => {
    models.comments.findAll({
      include: { model: models.posts},
      where: { postId:req.params.id},
      order: [["createdAt","DESC"]]
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

// exports.findAllCommentsValidated = (req, res, next) => {
//   models.comments.findAll({
//     where:{visible:1},
//     order:[["updatedAt","DESC"]],
//   })
//       .then(comments => res.status(200).json(comments))
//       .catch(error => res.status(400).json({ error }));
// };

// exports.allUsers = ( req, res, next ) => {
//     models.comments.findAll({ 
//       include: { model: models.users},
//       where: { userId:req.params.id},
//       order: [["createdAt","DESC"]]
//     })
//         .then(comments => res.status(200).json({ message: 'Liste des comments !'}))//.then(comments => res.status(200).json(comments))
//         .catch(error => res.status(400).json({ error }));
//   };