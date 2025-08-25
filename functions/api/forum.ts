import { PrismaClient } from '@prisma/client';
import { IttyRouter } from 'itty-router';

const prisma = new PrismaClient();
const router = IttyRouter({ base: '/api/forum' });

/**
 * @route GET /api/forum/posts
 * @description Obtiene todos los posts del foro.
 */
router.get('/posts', async () => {
  try {
    const posts = await prisma.forumPost.findMany({
      include: {
        user: { select: { name: true } }, // Incluir nombre del autor
        _count: { select: { comments: true } }, // Contar comentarios
      },
      orderBy: { createdAt: 'desc' },
    });
    return new Response(JSON.stringify(posts), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener los posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

/**
 * @route POST /api/forum/posts
 * @description Crea un nuevo post en el foro.
 * @requires Autenticación (lógica a implementar con middleware)
 */
router.post('/posts', async (request) => {
  // NOTA: La autenticación del usuario debe ser manejada por un middleware.
  // Por ahora, asumimos que `userId` viene en el cuerpo de la petición.
  const { title, content, userId } = await request.json();

  if (!title || !content || !userId) {
    return new Response(JSON.stringify({ error: 'Título, contenido y ID de usuario son requeridos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const post = await prisma.forumPost.create({
      data: { title, content, userId },
    });
    return new Response(JSON.stringify(post), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al crear el post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

export default router;
