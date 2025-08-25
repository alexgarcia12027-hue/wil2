import { jwtVerify } from 'jose';

// Define la estructura del payload del JWT
interface UserJWTPayload {
  userId: string;
  role: 'user' | 'admin';
  iat: number;
  exp: number;
}

const getJwtSecret = (env) => {
  const secret = env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET no está configurado en las variables de entorno.');
  }
  return new TextEncoder().encode(secret);
};

/**
 * Middleware para verificar la autenticación del usuario.
 * Añade el payload del token a la petición si es válido.
 */
export const authenticate = async (request, env) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Acceso no autorizado: Falta token' }), { status: 401 });
  }

  const token = authHeader.substring(7);
  try {
    const secret = getJwtSecret(env);
    const { payload } = await jwtVerify<UserJWTPayload>(token, secret);
    request.user = payload; // Adjuntar datos del usuario a la petición
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Acceso no autorizado: Token inválido' }), { status: 401 });
  }
};

/**
 * Middleware para verificar si el usuario es administrador.
 * Debe usarse DESPUÉS del middleware de autenticación.
 */
export const adminOnly = (request) => {
  if (request.user?.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Acceso denegado: Requiere rol de administrador' }), { status: 403 });
  }
};
