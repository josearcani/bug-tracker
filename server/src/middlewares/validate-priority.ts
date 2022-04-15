import { Request, Response, NextFunction } from 'express';

export const validatePriority = ( ...priorites: string[] ) => {
  return (req: Request, res:Response, next: NextFunction) => {
    const { priority } = req.body;
    if (!priorites.includes(priority)) {
      return res.status(401).json({
        message: `The priority needs to be ${priorites}`
      })
    }
    next();
  }
}