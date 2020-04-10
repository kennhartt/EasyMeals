const crypto = require('crypto');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const config = require('../config');
const authentication = require('../authentication');
// User Controller for user related requests

/** 
 * @param username
 * Pass the username in request body as username
 * @param password
 * Pass the password in request body as password
 * 
 * Returns auth token if successfull, returns error if not
*/
module.exports.userLogin = async (req, res, next) => {
    try {
    const userCollection = req.app.db.collection('Users');
    // Search for the user
    let user = await userCollection.findOne({
        username: req.body.username
    });

    if (!user) {
        return next(new Error('User not found'));
    }

    // Check if hashed passwords match
        const hash = crypto.createHash('sha256');
        hash.update(req.body.password);

        if (hash.digest('base64') != user.password) {
            return next(new Error("Password and username does not match"));
        } else {
            // if passwords match, 
            let token = jwt.sign({
                id: user._id
            }, config.secret, {
                expiresIn: 86400 //24 hours
            });
            res.status(200).send({
                auth: true,
                token: token,
                user: user.username
            });
        }
    } catch (err) {
        return next(new Error("Login error: " + err))
    }
}

/**
 * @param username
 * Pass the username in request body as username
 * @param password
 * Pass the password in request body as password
 * 
 * Returns success message or error depending on the result
 */
module.exports.createUser = async(req, res, next) => {
    try {
    const userCollection = req.app.db.collection('Users');
    let user = await userCollection.findOne({
        username: req.body.username
    }, {password: 0});

    if(user) {
        return next(new Error('This user already exists'));
    }
 
        // Password hashing
        const hash = crypto.createHash('sha256');
        hash.update(req.body.password)

        user = await userCollection.insertOne({
            username: req.body.username,
            password: hash.digest('base64'),
            recipeList: []
        });

        if(user) {
            res.status(201).send('Registration Successfull');
        }
    } catch (err) {
        return next(err);
    }
}

/**
 * @param newPassword
 * Pass desired password in the body as new password in the api call
 * @param enteredCurrentPassword
 * Pass current password entered by as user in the body of the api call
 * @param req.body.username
 * Pass user email in the body of the api call as username
 * 
 * Checks if hashed enteredCurrentPassword matches users current password, 
 * if so hash the newPassword and change the old password to the new one
 */
module.exports.changePassword = async(req, res, next) => {
    if (!authentication.authenticate(req, res))
        return;
    try {
        let newPassword, currentPassword, enteredCurrentPassword;
        const hash = crypto.createHash('sha256');

        enteredCurrentPassword = req.body.enteredCurrentPassword;

        let user = await req.app.db.collection('Users').findOne({username: req.body.username});
        if(!user) {
            return next(new Error('This user does not exist'));
        }
        currentPassword = user.password;
        hash.update(enteredCurrentPassword);
        if (currentPassword != hash.digest('base64')) {
            return next(new Error('Password is incorrect'));
        } else {
            newPassword = req.body.newPassword;
            const hashNewPassword = crypto.createHash('sha256');
            hashNewPassword.update(newPassword);
            const digestedNewPassword = hashNewPassword.digest('base64');
            if (currentPassword == digestedNewPassword) {
                return next(new Error('New password cannot be the same as the old one'));
            }

            let response = await req.app.db.collection('Users').updateOne(
                {username: req.body.username},
                {$set: {password: digestedNewPassword}}
            )
            
            res.send("Password successfully changed");
        }
    } catch (err) {
        return next(err);
    }
}

/**
 * @param username
 * Pass the user email as username in the body of the api call
 * @param recipeId
 * Pass the id of the recipe to add in the body of the api call as recipeId
 * 
 * Adds the recipeId to the favorites list of the user
 */
module.exports.addRecipe = async (req, res, next) => {
    if (!authentication.authenticate(req, res))
        return;

    try{
        let username = req.body.username;
        let recipeId = req.body.recipeId;

        let response = await req.app.db.collection('Users').updateOne(
            {username},
            {$push: {recipeList: recipeId}});

        if(response) {
            res.send("Recipe added to favorites");
        } else {
            res.send(new Error("There was a problem with the request"));
        }
    } catch {
        return next(err);
    }
}

/**
 * @param username
 * Pass the user email as username in the body of the api call
 * @param recipeId
 * Pass the id of the recipe to remove in the body of the api call as recipeId
 * 
 * Removes the recipeId from the favorites list of the user
 */
module.exports.removeRecipe = async (req, res, next) => {
    if (!authentication.authenticate(req, res))
        return;

        try{
            let username = req.body.username;
            let recipeId = req.body.recipeId;
    
            let response = await req.app.db.collection('Users').updateOne(
                {username},
                {$pull: {recipeList: recipeId}});
    
            if(response.result.nModified > 0) {
                res.send("Recipe removed from favorites");
            } else {
                return next(new Error("Nothing to remove"));
            }
        } catch {
            return next(err);
        } 
}

/**
 * @param username
 * Pass the email of the username as username in the body of the api call
 * 
 * Returns the array list of recipe ids for that user
 */
module.exports.getUserRecipeIds = async (req, res, next) => {
    if (!authentication.authenticate(req, res))
        return;

    try {
        let username = req.body.username;
        let user = await req.app.db.collection('Users').findOne({username});
        if(!user) {
            return next(new Error('No user found'));
        }
        let recipeList = user.recipeList;

        res.send(recipeList);
    } catch (err) {
        return next(err);
    }
}