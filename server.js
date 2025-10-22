// Server.js is where we import modules
// We begin by loading Express

const dotenv = require('dotenv'); //require package
dotenv.config();                  //loads the environment variables from .env file
                                  //environment variable here is the MONGODB_URI (atlas connection link)

const express = require('express'); 
const mongoose = require('mongoose'); 
//mongoose helps the application connect to a database

const app = express();

mongoose.connect(process.env.MONGODB_URI); 
// here we are establishing the connection between my app and mongo

mongoose.connection.on('connected', () => {
    console.log('connected to MongoDB Fruits')
})
// this is an event listener that runs the callback function (console.log) 
// once we have connected to the database. 

const Fruit = require('./models/fruit.js');
//imports the model from the model file, fruit.js

// GET / 
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
//All routes should be defined above app.listen()




