const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const commentRoute = require('./routes/comment');

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

//ajout 10/07
// app.post('/api/post', (req, res, next) => {
    // console.log(req.body);
    // res.status(201).json({
        // message:'Message créé !'
    // });
// }); 



module.exports = app;
