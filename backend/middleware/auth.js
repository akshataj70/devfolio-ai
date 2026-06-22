const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No auth token found. Authorization denied.'
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token is empty. Authorization denied.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devfolio_super_secret_key_2026');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({
      success: false,
      message: 'Token is invalid or expired. Authorization denied.'
    });
  }
};

module.exports = auth;
