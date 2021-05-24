const sequelize = require('sequelize');
const uniqueValidator = require('sequelize-unique-validator');

const userSchema = sequelize.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);// à supp car plus nécessaire grâce à mySQL

module.exports = sequelize.model('User', userSchema);