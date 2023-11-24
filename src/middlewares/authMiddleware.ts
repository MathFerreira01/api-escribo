import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'Não autorizado!' });

  try {
    const secret = process.env.SECRET || '';
    jwt.verify(token, secret);

    next();
  } catch (err) {
    
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ msg: 'Sessão inválida!' });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ msg: 'Não autorizado!' });
    }

    res.status(400).json({ msg: 'O Token é inválido!' });
  }
}
