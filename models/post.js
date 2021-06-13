module.exports = ( sequelize, DataTypes) => {
    const posts = sequelize.define('posts', {
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      visible: { type: DataTypes.BOOLEAN },
    },{});
    posts.associate = function(models){
        models.posts.belongsTo(models.users,{foreignKey: {allowNull:false}})
    };
    return posts;
  }

  