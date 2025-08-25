import { PrismaClient } from '@prisma/client';
import { IttyRouter } from 'itty-router';
import { authenticate } from './middleware';

const prisma = new PrismaClient();
const router = IttyRouter({ base: '/api/enrollments' });

/**
 * @route GET /api/enrollments/my-courses
 * @description Obtiene todos los cursos en los que el usuario autenticado está inscrito.
 */
router.get('/my-courses', authenticate, async (request) => {
  const { userId } = request.user;

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true, // Incluir los detalles del curso
      },
    });

    // Extraer solo los cursos de las inscripciones
    const myCourses = enrollments.map(enrollment => enrollment.course);

    return new Response(JSON.stringify(myCourses), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Error fetching enrollments for user ${userId}:`, error);
    return new Response(JSON.stringify({ error: 'Error al obtener mis cursos' }), { status: 500 });
  }
});

export default router;
