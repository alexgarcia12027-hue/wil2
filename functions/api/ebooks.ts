import { PrismaClient } from '@prisma/client';
import { IttyRouter } from 'itty-router';

// Inicializar Prisma Client
const prisma = new PrismaClient();

// Crear un nuevo router para los ebooks
const router = IttyRouter({ base: '/api/ebooks' });

/**
 * @route GET /api/ebooks
 * @description Obtiene una lista de todos los ebooks.
 */
router.get('/', async () => {
  try {
    const ebooks = await prisma.ebook.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return new Response(JSON.stringify(ebooks), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching ebooks:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener los ebooks' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

/**
 * @route GET /api/ebooks/:id
 * @description Obtiene un ebook específico por su ID.
 */
router.get('/:id', async (request) => {
  const { id } = request.params;
  try {
    const ebook = await prisma.ebook.findUnique({
      where: { id },
    });

    if (!ebook) {
      return new Response(JSON.stringify({ error: 'Ebook no encontrado' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404,
      });
    }

    return new Response(JSON.stringify(ebook), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error(`Error fetching ebook with id ${id}:`, error);
    return new Response(JSON.stringify({ error: 'Error al obtener el ebook' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

/**
 * @route POST /api/ebooks
 * @description Crea un nuevo ebook.
 */
router.post('/', async (request) => {
  try {
    const data = await request.json();
    const ebook = await prisma.ebook.create({ data });
    return new Response(JSON.stringify(ebook), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating ebook:', error);
    return new Response(JSON.stringify({ error: 'Error al crear el ebook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

/**
 * @route PUT /api/ebooks/:id
 * @description Actualiza un ebook existente.
 */
router.put('/:id', async (request) => {
  const { id } = request.params;
  try {
    const data = await request.json();
    const ebook = await prisma.ebook.update({
      where: { id },
      data,
    });
    return new Response(JSON.stringify(ebook), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Error updating ebook ${id}:`, error);
    return new Response(JSON.stringify({ error: 'Error al actualizar el ebook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

/**
 * @route DELETE /api/ebooks/:id
 * @description Elimina un ebook.
 */
router.delete('/:id', async (request) => {
  const { id } = request.params;
  try {
    await prisma.ebook.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting ebook ${id}:`, error);
    return new Response(JSON.stringify({ error: 'Error al eliminar el ebook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

export default router;
