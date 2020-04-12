const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    category: [String],
    diet: [String],
    type: [String],
    ingredients: [Number],
    servingTime: {
        hour: Number,
        minutes: Number
    },
    servings: Number,
    imageURL: String,
    summary: String,
    instructions: [{
        stepType: String,
        recipeId: Schema.Types.ObjectId,
        step: String
    }],
    customIngredients: [String],
    calories: Number,
    dateCreated: Date,
    lastUpdated: Date
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'Recipes');

module.exports = Recipe;

