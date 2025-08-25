import { PrismaClient } from '@prisma/client';
import { IttyRouter } from 'itty-router';

const prisma = new PrismaClient();
const router = IttyRouter({ base: '/api/courses' });

/**
 * @route GET /api/courses
 * @description Obtiene una lista de todos los cursos.
 */
router.get('/', async () => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return new Response(JSON.stringify(courses), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener los cursos' }), { status: 500 });
  }
});

/**
 * @route GET /api/courses/:id
 * @description Obtiene un curso por su ID, incluyendo módulos y lecciones.
 */
router.get('/:id', async (request) => {
  const { id } = request.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });

    if (!course) {
      return new Response(JSON.stringify({ error: 'Curso no encontrado' }), { status: 404 });
    }
    return new Response(JSON.stringify(course), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    return new Response(JSON.stringify({ error: 'Error al obtener el curso' }), { status: 500 });
  }
});

// Aquí se añadirán las rutas para crear, actualizar, eliminar y inscribirse (enroll).
// Estas requerirán autenticación y se añadirán en el siguiente paso.

import { authenticate, adminOnly } from './middleware';

// ... (código existente)

/**
 * @route POST /api/courses
 * @description Crea un nuevo curso (Solo Admin).
 */
router.post('/', authenticate, adminOnly, async (request) => {
  try {
    const courseData = await request.json();
    const newCourse = await prisma.course.create({
      data: { ...courseData, authorId: request.user.userId },
    });
    return new Response(JSON.stringify(newCourse), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al crear el curso' }), { status: 500 });
  }
});

/**
 * @route PUT /api/courses/:id
 * @description Actualiza un curso (Solo Admin).
 */
router.put('/:id', authenticate, adminOnly, async (request) => {
  const { id } = request.params;
  try {
    const courseData = await request.json();
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: courseData,
    });
    return new Response(JSON.stringify(updatedCourse));
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al actualizar el curso' }), { status: 500 });
  }
});

/**
 * @route DELETE /api/courses/:id
 * @description Elimina un curso (Solo Admin).
 */
router.delete('/:id', authenticate, adminOnly, async (request) => {
  const { id } = request.params;
  try {
    await prisma.course.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al eliminar el curso' }), { status: 500 });
  }
});


/**
 * @route POST /api/courses/:id/enroll
 * @description Inscribe al usuario autenticado en un curso.
 */
router.post('/:id/enroll', authenticate, async (request) => {
  const { id: courseId } = request.params;
  const { userId } = request.user;

  try {
    // Verificar si ya está inscrito
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });

    if (existingEnrollment) {
      return new Response(JSON.stringify({ message: 'Ya estás inscrito en este curso' }), { status: 409 }); // Conflict
    }

    // Crear la inscripción
    const enrollment = await prisma.enrollment.create({
      data: { userId, courseId },
    });

    return new Response(JSON.stringify(enrollment), { status: 201 });
  } catch (error) {
    console.error(`Error enrolling user ${userId} in course ${courseId}:`, error);
    return new Response(JSON.stringify({ error: 'Error al procesar la inscripción' }), { status: 500 });
  }
});


export default router;
