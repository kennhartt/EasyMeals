const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    firebaseUid: {type: String, required: true},
    dateOfBirth: Date,
    dateCreated: Date,
    lastActivity: Date,
    fullName: String,
    favoriteRecipes: [Schema.Types.ObjectId],
    favoriteRecipesSpoon: [Number],
    createdRecipes: [{
        recipeId: Schema.Types.ObjectId,
        recipeTitle: String
    }],
    boughtRecipes: [Schema.Types.ObjectId],
    accessibleRecipes: [Schema.Types.ObjectId]
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;