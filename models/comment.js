module.exports = ( sequelize, DataTypes) => {
    const comments = sequelize.define('comments', {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    visible: { type: DataTypes.BOOLEAN },
  },{});
  comments.associate = function(models){
    models.comments.belongsTo(models.posts,{foreignKey: 'postId', allowNull:false,/*foreignKey: {allowNull:false}*/})
    models.comments.belongsTo(models.users,{foreignKey: 'userId', allowNull:false,/*foreignKey: {allowNull:false}*/})
  };
  return comments;
}