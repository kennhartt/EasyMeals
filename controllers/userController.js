const crypto = require('crypto');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const config = require('../config');
const authentication = require('../authentication');

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