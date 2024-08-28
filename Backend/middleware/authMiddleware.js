import jwt from 'jsonwebtoken';
import User from '../modles/userModel.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database and exclude the password
      req.user = await User.findById(decoded.id).select('-password');

      // Call the next middleware or route handler
      next();
    } catch (error) {
      // If the token verification fails, return a 401 Unauthorized error
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  // If no token was found in the header, return a 401 Unauthorized error
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
