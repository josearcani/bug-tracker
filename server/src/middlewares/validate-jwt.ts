import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secretTokenKey } from '../utils/config';

interface TokenInterface {
  id: string;
  username: string;
  email: string
}

export const validateJWT = async (req: Request , res: Response, next: NextFunction) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      message: 'No auth token found. Authorization denied.'
    });
  }
  try {
    const decodedToken = jwt.verify(token, secretTokenKey) as TokenInterface;
    if (!decodedToken.id) {
      return res.status(401).send({ message: 'Token not valid. Authorization denied.' });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}