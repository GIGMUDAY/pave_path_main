import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

export interface AuthedRequest extends Request {
  user?: { id: number; email: string };
}

export const requireAuth = (req: AuthedRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (typeof payload === 'string' || !payload || typeof (payload as JwtPayload).sub === 'undefined') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const data = payload as JwtPayload & { sub: number; email?: string };
    req.user = { id: Number(data.sub), email: data.email || '' };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
