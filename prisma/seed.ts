import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Limpiar la base de datos de ebooks existentes
  await prisma.ebook.deleteMany({});

  const ebooksData = [
    {
      title: 'Guía Definitiva de Contratos Digitales',
      description: 'Un manual completo sobre la creación, gestión y validez legal de los contratos en el mundo digital.',
      price: 49.99,
      fileUrl: '/downloads/guia-contratos-digitales.pdf',
    },
    {
      title: 'Derecho de Familia para el Siglo XXI',
      description: 'Análisis de los nuevos modelos de familia, divorcios, custodias y cómo la ley se ha adaptado a ellos.',
      price: 39.99,
      fileUrl: '/downloads/derecho-familia-siglo-xxi.pdf',
    },
    {
      title: 'Propiedad Intelectual en la Era de la IA',
      description: 'Protege tus creaciones. Aprende sobre derechos de autor, patentes y marcas en el contexto de la inteligencia artificial.',
      price: 59.99,
      fileUrl: '/downloads/propiedad-intelectual-ia.pdf',
    },
    {
      title: 'Manual Práctico de Derecho Laboral',
      description: 'Todo lo que empleados y empleadores necesitan saber sobre contratos, despidos, y derechos laborales.',
      price: 29.99,
      fileUrl: '/downloads/manual-derecho-laboral.pdf',
    },
  ];

  await prisma.ebook.createMany({
    data: ebooksData,
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
