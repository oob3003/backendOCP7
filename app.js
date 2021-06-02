const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

const userRoute = require('./routes/user');
// CORS obligatoire car front et back ont deux URL distincts
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(helmet());
app.use(bodyParser.json());

app.use('/api', userRoute) // chemin pour les requêtes via l'API ( localhost:3000/api )

app.post('/api/post', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message:'Message créé !'
    });
});

/*app.use('/api/post', (req, res, next) => {
    const post = [
        {
            title: 'Mon premier post',
            description: 'Be a Dev',
            imageUrl: 'https://cdn.pixabay.com/photo.2019/06/11/18/56/camera-4267692_1280.jpg',
            userId: 'devOne'
        },
        {
            title: 'Mon 2eme post',
            description: 'Be a  Good Dev',
            imageUrl: 'https://cdn.pixabay.com/photo.2019/06/11/18/56/camera-4267692_1280.jpg',
            userId: 'devTwo'
        },
    ];
    res.status(200).json(post);  
});*/

module.exports = app;
