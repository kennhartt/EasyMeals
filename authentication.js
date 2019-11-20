const jwt = require('jsonwebtoken');
const config = require('./config');

//Authentication function for keeping user sessions
module.exports.authenticate = (req,res) => {
    const token = req.headers['x-access-token'];
    const authFailed = false;
    if (!token) 
    {
        res.status(401).send({ auth: false, message: 'No token provided.' });
        return false;
    }
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