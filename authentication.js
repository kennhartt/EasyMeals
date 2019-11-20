const jwt = require('jsonwebtoken');
const config = require('./config');

//Authentication function for keeping user sessions
module.exports.authenticate = (req,res) => {
  //Checks if the token is there
    const token = req.headers['x-access-token'];
    let authFailed = false;
    // If token is not there, means user is not logged in
    if (!token) 
    {
        res.status(401).send({ auth: false, message: 'No token provided.' });
        return false;
    }

    //If token is there, verify it with secret code to see if it is correct
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) 
        {
            res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });                
            authFailed = true;
        } 
      });

      if(authFailed)
        return false;
      else
        return true;
}