const spoonacularAPIKey = "b05207a1e079405c9d7bdafbc8f62047";
const authentication = require("../authentication");
const Recipe = require('../models/recipe');
const User =require('../models/user');

module.exports.addRecipe = (req, res, next) => {
    const username = req.body.username;
    const title = req.body.title;

    User.findOne({username: username})
        .then(user => {
            let recipeExists = user.createdRecipes.find(recipe => {
                return recipe.recipeTitle === title;
            });
            if(recipeExists) {
                return next(new Error('You already have a recipe with the same title'));
            }
            let newRecipe = new Recipe({
                author: username,
                title: title,
                category: req.body.category,
                diet: req.body.diet,
                type: req.body.type,
                ingredients: req.body.ingredients,
                servingTime: req.body.servingTime,
                servings: req.body.servings,
                imageURL: req.body.imageURL,
                instructions: req.body.instructions,
                customIngredients: req.body.customIngredients,
                calories: req.body.calories,
                dateCreated: new Date(Date.now()).toISOString()
            });
        
            newRecipe.save()
                .then(recipe => {
                    let newRecipe = {
                        recipeId: recipe._id,
                        recipeTitle: recipe.title
                    }
                    User.findOneAndUpdate({username: username}, {
                        $push: {createdRecipes: newRecipe}
                    }).then(res.status(200).send('Recipe created successfully'))
                    .catch(error => {return next(error)});
                    
                })
                .catch(error => {return next(error)});
        }).catch(error => {return next(error)});

    
}