module.exports = ( sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.TEXT('tiny') , allowNull: false },// 0 pour user en attente de validation, 1 pour user validé, 2 pour admin
    visible: { type: DataTypes.BOOLEAN },
  },{});
  users.associate = function(models){
    models.users.hasMany(models.posts)
  };
  return users;
}

