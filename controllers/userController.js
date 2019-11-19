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
                user: user
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
            password: hash.digest('base64')
        });

        if(user) {
            res.status(201).send('Registration Successfull');
        }
    } catch (err) {
        return next(err);
    }
}

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