export const ebooks = [
  {
    id: 'ebook-1',
    title: 'Guía Completa del Derecho Penal Ecuatoriano',
    description: 'Manual exhaustivo sobre los procedimientos penales, derechos del imputado y estrategias de defensa en Ecuador.',
    price: 49.99,
    originalPrice: 79.99,
    author: 'Abg. Wilson Alexander Ipiales Guerron',
    pages: 250,
    format: 'PDF Digital',
    language: 'Español',
    category: 'Derecho Penal',
    image: '/images/ebook-derecho-penal.jpg',
    features: [
      'Casos prácticos resueltos',
      'Formularios y plantillas',
      'Jurisprudencia actualizada',
      'Acceso de por vida',
      'Actualizaciones gratuitas'
    ],
    tableOfContents: [
      'Introducción al Sistema Penal Ecuatoriano',
      'Proceso Penal: Etapas y Procedimientos',
      'Derechos del Imputado',
      'Estrategias de Defensa',
      'Recursos y Apelaciones',
      'Casos Prácticos'
    ]
  },
  {
    id: 'ebook-2',
    title: 'Derecho Comercial y Empresarial Moderno',
    description: 'Guía práctica para emprendedores y empresarios sobre constitución de empresas, contratos y protección legal.',
    price: 39.99,
    originalPrice: 59.99,
    author: 'Abg. Wilson Alexander Ipiales Guerron',
    pages: 180,
    format: 'PDF Digital',
    language: 'Español',
    category: 'Derecho Comercial',
    image: '/images/ebook-derecho-comercial.jpg',
    features: [
      'Plantillas de contratos',
      'Guía de constitución de empresas',
      'Protección de marca registrada',
      'Casos de éxito reales',
      'Herramientas descargables'
    ]
  },
  {
    id: 'ebook-3',
    title: 'Manual de Derechos Laborales',
    description: 'Todo lo que empleadores y trabajadores deben saber sobre la legislación laboral ecuatoriana.',
    price: 29.99,
    originalPrice: 44.99,
    author: 'Abg. Wilson Alexander Ipiales Guerron',
    pages: 150,
    format: 'PDF Digital',
    language: 'Español',
    category: 'Derecho Laboral',
    image: '/images/ebook-derecho-laboral.jpg',
    features: [
      'Calculadora de beneficios sociales',
      'Modelos de contratos laborales',
      'Guía de despidos y finiquitos',
      'Reformas laborales recientes'
    ]
  }
];

export const masterclasses = [
  {
    id: 'masterclass-1',
    title: 'Estrategias Avanzadas en Defensa Penal',
    description: 'Masterclass intensiva sobre técnicas avanzadas de defensa penal, análisis de casos complejos y estrategias ganadoras.',
    price: 299.99,
    originalPrice: 499.99,
    instructor: 'Abg. Wilson Alexander Ipiales Guerron',
    duration: '8 horas',
    format: 'En vivo + Grabación',
    level: 'Avanzado',
    category: 'Derecho Penal',
    image: '/images/masterclass-defensa-penal.jpg',
    features: [
      'Sesión en vivo de 4 horas',
      'Grabación completa disponible',
      'Materiales descargables',
      'Certificado de participación',
      'Sesión de preguntas y respuestas',
      'Acceso por 12 meses'
    ],
    modules: [
      'Análisis estratégico de casos penales',
      'Técnicas de interrogatorio',
      'Manejo de evidencia',
      'Recursos y apelaciones efectivas',
      'Casos prácticos en vivo'
    ],
    nextDate: '2024-02-15',
    enrolled: 45,
    maxStudents: 100
  },
  {
    id: 'masterclass-2',
    title: 'Constitución y Gestión de Empresas',
    description: 'Aprenda todo sobre la constitución legal de empresas, gestión societaria y protección patrimonial.',
    price: 199.99,
    originalPrice: 299.99,
    instructor: 'Abg. Wilson Alexander Ipiales Guerron',
    duration: '6 horas',
    format: 'En vivo + Grabación',
    level: 'Intermedio',
    category: 'Derecho Empresarial',
    image: '/images/masterclass-empresas.jpg',
    features: [
      'Plantillas de documentos legales',
      'Guía paso a paso de constitución',
      'Sesión de consultoría grupal',
      'Certificado profesional'
    ],
    nextDate: '2024-02-22',
    enrolled: 32,
    maxStudents: 80
  },
  {
    id: 'masterclass-3',
    title: 'Nuevas Reformas Laborales 2024',
    description: 'Actualización completa sobre las últimas reformas al Código de Trabajo y su impacto en empleadores y trabajadores.',
    price: 149.99,
    originalPrice: 199.99,
    instructor: 'Abg. Wilson Alexander Ipiales Guerron',
    duration: '4 horas',
    format: 'En vivo + Grabación',
    level: 'Básico-Intermedio',
    category: 'Derecho Laboral',
    image: '/images/masterclass-reformas-laborales.jpg',
    features: [
      'Análisis de reformas recientes',
      'Casos prácticos de aplicación',
      'Plantillas actualizadas',
      'Sesión de preguntas'
    ],
    nextDate: '2024-02-08',
    enrolled: 67,
    maxStudents: 120
  }
];

export const courses = [
  {
    id: 'curso-1',
    title: 'Fundamentos del Derecho Ecuatoriano',
    description: 'Curso completo para principiantes que desean entender los fundamentos del sistema jurídico ecuatoriano.',
    price: 199.99,
    originalPrice: 299.99,
    instructor: 'Abg. Wilson Alexander Ipiales Guerron',
    duration: '12 semanas',
    format: 'Online Self-Paced',
    level: 'Principiante',
    category: 'Derecho General',
    image: '/images/curso-fundamentos.jpg',
    features: [
      '24 lecciones en video',
      'Material descargable',
      'Exámenes de autoevaluación',
      'Certificado de finalización',
      'Acceso de por vida',
      'Foro de estudiantes'
    ],
    modules: [
      'Introducción al Sistema Jurídico',
      'Derecho Constitucional Básico',
      'Derecho Civil Fundamental',
      'Introducción al Derecho Penal',
      'Principios del Derecho Laboral',
      'Derecho Comercial Básico'
    ],
    enrolled: 234,
    rating: 4.8,
    reviews: 47
  },
  {
    id: 'curso-2',
    title: 'Especialización en Litigios Civiles',
    description: 'Curso avanzado para abogados que buscan especializarse en la representación en casos civiles complejos.',
    price: 499.99,
    originalPrice: 799.99,
    instructor: 'Abg. Wilson Alexander Ipiales Guerron',
    duration: '16 semanas',
    format: 'Online + Tutorías',
    level: 'Avanzado',
    category: 'Derecho Civil',
    image: '/images/curso-litigios-civiles.jpg',
    features: [
      '32 lecciones especializadas',
      'Casos reales documentados',
      'Tutorías personalizadas',
      'Simulacros de audiencia',
      'Networking con profesionales'
    ],
    enrolled: 89,
    rating: 4.9,
    reviews: 23
  }
];

export const legalProducts = [
  {
    id: 'producto-1',
    title: 'Kit de Plantillas Legales Empresariales',
    description: 'Colección completa de plantillas legales para empresas: contratos, acuerdos, políticas y más.',
    price: 149.99,
    originalPrice: 249.99,
    category: 'Plantillas Legales',
    image: '/images/kit-plantillas-empresariales.jpg',
    features: [
      '50+ plantillas en Word/PDF',
      'Contratos de trabajo',
      'Acuerdos de confidencialidad',
      'Políticas empresariales',
      'Guía de uso incluida',
      'Actualizaciones por 1 año'
    ],
    downloads: 156,
    rating: 4.7
  },
  {
    id: 'producto-2',
    title: 'Calculadora de Beneficios Sociales',
    description: 'Herramienta digital para calcular beneficios sociales, liquidaciones y finiquitos según la ley ecuatoriana.',
    price: 79.99,
    originalPrice: 119.99,
    category: 'Herramientas Digitales',
    image: '/images/calculadora-beneficios.jpg',
    features: [
      'Cálculos automáticos precisos',
      'Actualizada con última normativa',
      'Exportación a PDF',
      'Soporte técnico incluido',
      'Licencia por 2 años'
    ],
    downloads: 89,
    rating: 4.9
  },
  {
    id: 'producto-3',
    title: 'Biblioteca Jurisprudencial Digital',
    description: 'Acceso a una extensa base de datos de jurisprudencia ecuatoriana organizada por materia y actualizada.',
    price: 299.99,
    originalPrice: 499.99,
    category: 'Base de Datos',
    image: '/images/biblioteca-jurisprudencial.jpg',
    features: [
      'Más de 5,000 sentencias',
      'Búsqueda avanzada',
      'Filtros por materia y fecha',
      'Actualizaciones mensuales',
      'Acceso web y móvil',
      'Suscripción anual'
    ],
    downloads: 67,
    rating: 4.8
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    position: 'Empresario',
    company: 'Comercial Rodríguez S.A.',
    case: 'Disputa Comercial',
    result: 'Acuerdo favorable',
    image: '/images/testimonial-carlos.jpg',
    rating: 5,
    comment: 'El Abg. Wilson Ipiales manejó mi caso de disputa comercial con profesionalismo excepcional. Su conocimiento del derecho mercantil y su estrategia legal fueron fundamentales para alcanzar un acuerdo favorable. Recomiendo ampliamente sus servicios.',
    date: '2024-01-15'
  },
  {
    id: 2,
    name: 'María Elena Vásquez',
    position: 'Directora de RRHH',
    company: 'Textiles del Norte',
    case: 'Asesoría Laboral',
    result: 'Cumplimiento normativo',
    image: '/images/testimonial-maria.jpg',
    rating: 5,
    comment: 'Excelente asesoría en temas laborales. Nos ayudó a implementar todas las nuevas reformas laborales sin contratiempos. Su expertise evitó que cometiéramos errores costosos.',
    date: '2024-01-10'
  },
  {
    id: 3,
    name: 'Roberto Sandoval',
    position: 'Conductor Profesional',
    company: 'Independiente',
    case: 'Infracción de Tránsito',
    result: 'Multa anulada',
    image: '/images/testimonial-roberto.jpg',
    rating: 5,
    comment: 'Logró que me anularan una multa injusta de tránsito. Su conocimiento de la ley de tránsito es impresionante. Muy agradecido por su profesionalismo y dedicación.',
    date: '2024-01-05'
  }
];
