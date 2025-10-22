const mongoose = require('mongoose') 
// have to add the mongoose library

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
});
//this is a schema that creates two properties of the object name and isReadyToEat

const Fruit = mongoose.model('Fruit', fruitSchema);
// this is how the model is created. it takes two arguments
// the name of the model, and the schema that was just created

module.exports = Fruit
// this exports the model. Making it available to reference into 
// other files. 