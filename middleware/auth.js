const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // console.log(req.headers.authorization)
    const decodedToken = jwt.verify(token, 'chaussette'); // à modifier
    // console.log(decodedToken)
    const userId = decodedToken.userId;
    console.log(userId)
    if (req.body.userId && req.body.userId != userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
