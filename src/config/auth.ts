import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers.authorization;
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, process.env.SECRET, (error: jwt.VerifyErrors, decoded: jwt.JwtPayload) => {
      if (error) {
        return res.status(500).json({ auth: false, error: 'Failed to authenticate token' })
      }
    });

    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    return res.status(401).json({ error: error });
  }

  next();
};
