const firebaseAdmin = require('firebase-admin')
const User = require('./models/user')
require('dotenv').config()
// Set session expiration to 5 days.
const expiresIn = 60 * 60 * 24 * 5 * 1000

// Initialize firebase
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault()
})
const auth = firebaseAdmin.auth()

module.exports.login = async (req, res, next) => {
  try {
    const idToken = req.body.idToken
    const uid = req.body.uid
    if (!uid) {
      return next(new Error('User uid is required to make this call'))
    }
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })
    const options = { maxAge: expiresIn, httpOnly: true }
    res.cookie('session', sessionCookie, options)
    const user = await User.findOne({ firebaseUid: uid }).exec()
    if (!user) {
      // User with this uid doesnt exist yet, so we create one
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        firebaseUid: uid,
        dateCreated: new Date(Date.now()).toISOString(),
        lastActivity: new Date(Date.now()).toISOString(),
        fullName: '',
        favoriteRecipes: [],
        favoriteRecipesSpoon: [],
        createdRecipes: [],
        boughtRecipes: [],
        accessibleRecipes: []
      })
      const result = await newUser.save()
      if (result) {
        res.status(200).send(JSON.stringify({ status: 'success', type: 'Created' }))
      }
    } else {
      const result = await user.updateOne({ lastActivity: new Date(Date.now()).toISOString() }).exec()
      if (result) {
        res.status(200).send(JSON.stringify({ status: 'success', type: 'Login' }))
      }
    }
  } catch (error) {
    return next(error)
  }
}

module.exports.authenticate = async (req, res) => {
  try {
    const sessionCookie = req.cookies.session || ''
    const verify = await auth.verifySessionCookie(
      sessionCookie, true)
    if (verify) {
      return true
    }
  } catch (error) {
    return false
  }
}

// const jwt = require('jsonwebtoken');
// const config = require('./config');

// //Authentication function for keeping user sessions
// module.exports.authenticate = (req,res) => {
//   //Checks if the token is there
//     const token = req.headers['x-access-token'];
//     let authFailed = false;
//     // If token is not there, means user is not logged in
//     if (!token)
//     {
//         res.status(401).send({ auth: false, message: 'No token provided.' });
//         return false;
//     }

//     //If token is there, verify it with secret code to see if it is correct
//     jwt.verify(token, config.secret, function(err, decoded) {
//         if (err)
//         {
//             res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
//             authFailed = true;
//         }
//       });

//       if(authFailed)
//         return false;
//       else
//         return true;
// }
