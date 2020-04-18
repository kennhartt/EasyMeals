const spoonacularAPIKey = 'b05207a1e079405c9d7bdafbc8f62047'
const authentication = require('../authentication')
const maxNumberOfResults = 9
const request = require('request')

// Query controller to connect to our external API

/**
 * @param naturalString
 * Pass the search string in request body as naturalString
 *
 * Returns list of recipes based on the search query
 */
module.exports.queryByNatural = async (req, res, next) => {
  try {
    const naturalString = req.params.naturalString
    const options = {
      url: `https://api.spoonacular.com/recipes/search?apiKey=${spoonacularAPIKey}&query=${naturalString}&number=${maxNumberOfResults}`
    }

    request.get(options, async (error, response) => {
      if (error) {
        return next(error)
      }
      const bodyJson = JSON.parse(response.body)
      res.send(bodyJson)
    })
  } catch (err) {
    return next(err)
  }
}

/**
 * @param ingredients
 * Pass comma seperated string of ingredients in request body
 *
 * Returns list of recipes that contains that ingredient
 */
module.exports.queryByIngredient = async (req, res, next) => {
  try {
    const ingredients = req.params.ingredients
    const options = {
      url: `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${spoonacularAPIKey}&ingredients=${ingredients}&number=${maxNumberOfResults}`
    }

    request.get(options, async (error, response) => {
      if (error) {
        console.log('hello2')
        return next(error)
      }
      const bodyJson = JSON.parse(response.body)
      res.send(bodyJson)
    })
  } catch (err) {
    console.log('hello')
    return next(err)
  }
}

/**
 * @param recipeId
 * Pass the id of the recipe in the body of the api call as recipeId
 *
 * Calls the external api using the recipe id to return a detailed recipe
 */
module.exports.getRecipeById = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId

    const options = {
      url: `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${spoonacularAPIKey}`
    }

    request.get(options, async (error, response) => {
      if (error) {
        return next(error)
      }
      const bodyJson = JSON.parse(response.body)
      res.send(bodyJson)
    })
  } catch (err) {
    return next(err)
  }
}

/**
 * @param username
 * Pass the user email as username in the body of the api call
 *
 * Returns the users saved recipes
 */
module.exports.getUserRecipes = async (req, res, next) => {
  if (!authentication.authenticate(req, res)) return
  try {
    const username = req.params.username

    let userRecipes = await req.app.db
      .collection('Users')
      .findOne({ username: username })

    userRecipes = await userRecipes.recipeList.join()

    const options = {
      url: `https://api.spoonacular.com/recipes/informationBulk?ids=${userRecipes}&apiKey=${spoonacularAPIKey}`
    }

    request.get(options, async (error, response) => {
      if (error) {
        return next(error)
      }
      const bodyJson = JSON.parse(response.body)
      res.send(bodyJson)
    })
  } catch (err) {
    return next(err)
  }
}
