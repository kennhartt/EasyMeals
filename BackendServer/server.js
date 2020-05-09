const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const queryController = require('./controllers/queryController')
const userController = require('./controllers/userController')
const recipeController = require('./controllers/recipeController')
const authentication = require('./authentication')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
require('dotenv').config()

// Connects to our mongodb
const uri = process.env.MONGODB_URI
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(function(err, client) {
//     if(!err) {
//         app.db = client.db('EasyMeals');
//         console.log('Connected to database');
//     } else {
//         console.log('Problem connecting to database: ' + err);
//     }
// });
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to db')
})

// Set CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

// Node configuration
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const csrfProtection = csrf({ cookie: true })

// User Controllers
app.route('/api/user/createUser').post(userController.createUser) // Create user endpoint
// app.route('/api/user/login').post(userController.userLogin) // User login endpoint
app.route('/api/user/changePassword').post(userController.changePassword) // Change password
app.route('/api/user/addRecipe').post(userController.addRecipe) // Add recipe to user list
app.route('/api/user/getUserRecipeIds').post(userController.getUserRecipeIds) // Gets users recipe ids
app.route('/api/user/removeRecipe').post(userController.removeRecipe) // Remove recipe from saved list
app.route('/api/user/userCheck').post(userController.userCheck)
app.route('/api/user/login').post(csrfProtection, authentication.login)
app.route('/api/user/logout').post(csrfProtection, authentication.logout)
app.route('/api/user/csrfToken').get(csrfProtection, authentication.csrfToken)

// Recipe Query Controllers
app.route('/api/query/byNatural/:naturalString').get(queryController.queryByNatural) // Finds recipes by natural text string
app.route('/api/query/byIngredient/:ingredients').get(queryController.queryByIngredient) // Finds recipes by ingredients
app.route('/api/query/getRecipeById/:recipeId').get(queryController.getRecipeById) // Finds recipe by recipe id
app.route('/api/query/getUserRecipes/:username').get(queryController.getUserRecipes) // Returns recipes saved by users

// Recipe Controllers
app.route('/api/recipe/addRecipe').post(recipeController.addRecipe)

app.listen(process.env.PORT || 8000)

// ERROR HANDLING
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.status || 500).send(err.message)
})
