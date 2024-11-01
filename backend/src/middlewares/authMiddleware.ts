import { Request, Response, NextFunction } from "express"; 
import { verifyToken } from "../utils/jwtUtils";

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  const user = verifyToken(token);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  req.user = { id: user.id, email: user.email };
  next();
};
