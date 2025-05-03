import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // For development purposes, we'll skip authentication
  // In a production app, you would properly implement this
  next();
  
  // Token verification to be added, not required right now.
};