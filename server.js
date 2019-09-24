const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const queryController = require('./controllers/queryController');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index');
})

app.route('/api/queryByIngredient').post(queryController.queryByIngredient); //Finds recipes by ingredient

app.listen(8000);