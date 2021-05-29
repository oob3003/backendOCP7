// models/index.js centralise les constantes réutilisables

const  Sequelize  = require('sequelize');

const fs = require('fs'); // gestion des fichiers dans Node
const path = require('path');

const baseName = path.basename(__filename);
const DB = {};
// connexion à la base données ocp7db
let sequelize;
sequelize = new Sequelize ( 'ocp7db', 'oob3003', 'OCP7oob3003!', { host: 'localhost', dialect: 'mysql'});
sequelize.authenticate()
    .then (() => console.log('connexion établie'))
    .catch ((error) => console.log('connexion a échouée', error));

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== baseName) && (file.slice(-3) === '.js');
}).forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    DB[ model.name ] = model
})
Object.keys(DB).forEach( modelName => {
    if(DB[modelName].associate ) {
        DB[modelName].associate(DB);
    }
})

DB.sequelize = sequelize // connexion
DB.Sequelize = Sequelize // module Sequelize

module.exports = DB