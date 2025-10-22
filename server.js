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

app.use(express.urlencoded({extended: false }));
//Accesses this data Express.
//uses middleware 'express.urlencoded' parses incoming request bodies
// extracting form data and converting it into a JS object. It then 
// attaches the object to 'req.body' property of the request, making 
// the form data accessible within the route handlers. 

// GET / 
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render('fruits/index.ejs', {fruits: allFruits }); 
    // passes fruit data from the data base to the EJS file. 
    // the data array is accessible as a variable named 'fruits'
    //make sure that there is a template for the referenced file in
    //res.render. 
});
//making this async is to use the await keyword to wait for .find()
// to complete its operation and assign the result to the allFruits 
// variable

app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs');
});

app.get('/fruits/:fruitId', async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/show.ejs', {fruit: foundFruit});
    });

app.post('/fruits', async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    //.create used to add the user input data to database
    res.redirect('/fruits');
})
// app.post defines the route for the user data from the form. Here it 
// uses the object, req.body, created with the express.urlencoded 
//method to manupulate the user input (like converting "on" to true)



app.listen(3000, () => {
  console.log('Listening on port 3000');
});
//All routes should be defined above app.listen()




