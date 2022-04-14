import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db/models';
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
    const { id } = jwt.verify(token, secretTokenKey) as TokenInterface;
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(401).json({
        message: 'Token not valid. User not found.'
      });
    }

    req.user = { id: user.id, email: user.email, username: user.username };
    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'Token not valid'
    });
  }
}