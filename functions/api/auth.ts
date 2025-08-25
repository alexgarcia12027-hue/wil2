import { PrismaClient } from '@prisma/client';
import { IttyRouter } from 'itty-router';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const router = IttyRouter({ base: '/api/auth' });

/**
 * @route POST /api/auth/register
 * @description Registra un nuevo usuario.
 */
router.post('/register', async (request) => {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email y contraseña son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'El correo electrónico ya está en uso' }), {
        status: 409, // Conflict
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // No devolver la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user;

    return new Response(JSON.stringify(userWithoutPassword), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response(JSON.stringify({ error: 'Error al registrar el usuario' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

import { SignJWT } from 'jose';

const ALG = 'HS256';

/**
 * @route POST /api/auth/login
 * @description Autentica a un usuario y devuelve un token JWT.
 */
router.post('/login', async (request, env) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email y contraseña son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new Response(JSON.stringify({ error: 'Credenciales inválidas' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Credenciales inválidas' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Crear el token JWT
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    const token = await new SignJWT({ userId: user.id, role: user.role })
      .setProtectedHeader({ alg: ALG })
      .setExpirationTime('24h')
      .setIssuedAt()
      .sign(secret);

    const { password: _, ...userWithoutPassword } = user;

    return new Response(JSON.stringify({ user: userWithoutPassword, token }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

export default router;
