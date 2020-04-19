const firebaseAdmin = require('firebase-admin')
const User = require('./models/user')
const csrf = require('csurf')
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
    console.log(req)
    if (!uid) {
      return next(new Error('User uid is required to make this call'))
    }
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })
    const options = { maxAge: expiresIn, httpOnly: true }
    res.cookie('session', sessionCookie, options)
    res.cookie('csrf-token', req.csrfToken(), {maxAge: expiresIn})
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
    console.log(error)
    return next(error)
  }
}

module.exports.authenticate = async (req) => {
  try {
    const sessionCookie = req.cookies.session || ''
    const verify = await auth.verifySessionCookie(sessionCookie, true)
    if (verify) {
      return true
    }
  } catch (error) {
      return false
  }
}

module.exports.logout = async(req, res, next) => {
  try {
    const sessionCookie = req.cookies.session || '';
    console.log(sessionCookie)
    res.clearCookie('session');
    const verify = await auth.verifySessionCookie(sessionCookie)
    _logout = await auth.revokeRefreshTokens(verify.sub)
    res.status(200).send('Logout OK')
  } catch (error) {
    res.status(404).send('Problem with logout')
  }
}
