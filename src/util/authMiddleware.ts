import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization']; // Get the entire Authorization header
  console.log("Authorization header:", authHeader); // Log the Authorization header for troubleshooting

  const token = authHeader?.split(' ')[1]; // Expecting "Bearer <token>"
  
  if (!token) {
    res.status(401).json({ message: 'Access Denied. No token provided.' });
    return; // Ensure the function returns void
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string); 
    console.log("Decoded token:", decoded); // Log the decoded token payload
    next(); // Token is valid, proceed to the next handler
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: 'Invalid token.' });
    return; // Ensure the function returns void
  }
};