const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const queryController = require('./controllers/queryController');
const userController = require('./controllers/userController');

const uri = "mongodb+srv://easyMeals:teamcallbackhell@easymeals-9x4fn.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function(err, client) {
    if(!err) {
        app.db = client.db('EasyMeals');
        console.log('Connected to database');
    } else {
        console.log('Problem connecting to database: ' + err);
    }
});


app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// User Controllers
app.route('/api/user/createUser').post(userController.createUser); // Create user endpoint
app.route('/api/user/login').post(userController.userLogin); // User login endpoint 

// Recipe Query Controllers
app.route('/api/queryByIngredient').post(queryController.queryByIngredient); // Finds recipes by ingredient


app.listen(8000);

//ERROR HANDLING
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err)
      }            
    res.status(500).send(err.message);
})