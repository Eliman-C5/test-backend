// Importa tus módulos necesarios
import { Request, Response, NextFunction } from 'express';

// Middleware para verificar autenticación
export const verifyAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Obtiene el token desde la solicitud (puedes obtenerlo de headers, cookies, etc.)
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - please login' });
  }

  next();
};