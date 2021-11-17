const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const commentRoute = require('./routes/comment');
const path = require('path'); // pour accéder au path de notre serveur

// CORS obligatoire car front et back ont deux URL distincts
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(helmet());
app.use(bodyParser.json());

app.use('/api', userRoute);// chemin pour les requêtes via l'API ( localhost:3000/api )
app.use('/post', postRoute);
app.use('/comment', commentRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
