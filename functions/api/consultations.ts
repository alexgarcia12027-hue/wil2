import { PrismaClient } from '@prisma/client';
import { IttyRouter } from 'itty-router';

const prisma = new PrismaClient();
const router = IttyRouter({ base: '/api/consultations' });

/**
 * @route POST /api/consultations
 * @description Crea una nueva consulta (p. ej. desde un formulario de contacto).
 */
router.post('/', async (request) => {
  try {
    const { clientName, email, message } = await request.json();

    if (!clientName || !email || !message) {
      return new Response(JSON.stringify({ error: 'Nombre, email y mensaje son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const consultation = await prisma.consultation.create({
      data: {
        clientName,
        email,
        message,
        status: 'pending',
      },
    });

    return new Response(JSON.stringify(consultation), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating consultation:', error);
    return new Response(JSON.stringify({ error: 'Error al crear la consulta' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

export default router;
