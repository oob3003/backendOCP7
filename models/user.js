module.exports = ( sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    //imageUrl: { type: DataTypes.STRING },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.TEXT('tiny') , allowNull: false },// 0 pour user en attente de validation, 1 pour user validé, 2 pour admin
  },{});
  users.associate = function(models){
    models.users.hasMany(models.posts);
    models.users.hasMany(models.comments)

  };
  return users;
}

