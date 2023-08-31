const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization.split(' ')[1];
  console.log("inside verify token");
  console.log("token", token);

  if (!token) {
    console.log("error tripped");
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    // Verify the token
    console.log("inside verify try");
    const secretKey = 'ladybug-soccer';
    console.log("Token to verify:", token);
    console.log("Secret key:", secretKey);
    
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ error: 'Invalid token' });
      }

      req.user = decoded.user;
      next();
    });
  } catch (error) {
    console.error("Try-catch error:", error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  verifyToken
};
