module.exports = ( sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.TEXT('tiny') , allowNull: false }
  });
  return users;
}

