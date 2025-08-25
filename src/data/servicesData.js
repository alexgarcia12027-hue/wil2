export const legalServices = [
  {
    id: 'penal',
    slug: 'derecho-penal',
    title: 'Defensa Penal',
    category: 'Litigio y Defensa',
    shortDescription: 'Defensa especializada en casos penales, desde la investigación hasta el juicio oral, incluyendo delitos de propiedad, tránsito y económicos.',
    longDescription: 'Ofrecemos una defensa penal integral y estratégica para proteger sus derechos en todas las etapas del proceso. Nuestra experiencia abarca una amplia gama de delitos, garantizando una representación legal robusta y personalizada.',
    keyPoints: [
      'Defensa en delitos contra la propiedad (robos, estafas)',
      'Defensa en delitos de tránsito y accidentes',
      'Defensa en delitos económicos y financieros',
      'Apelaciones y recursos en procesos penales'
    ],
    price: 800,
    priceInfo: 'Desde $800 (según complejidad)',
    icon: 'FaShield',
    image: '/images/derecho-penal.jpg'
  },
  {
    id: 'civil',
    slug: 'derecho-civil',
    title: 'Derecho Civil',
    category: 'Litigio y Defensa',
    shortDescription: 'Resolución de conflictos y litigios sobre incumplimientos contractuales, herencias, propiedad y daños y perjuicios.',
    longDescription: 'Manejamos una amplia variedad de disputas civiles, buscando soluciones eficientes a través de la negociación o el litigio para proteger su patrimonio y sus derechos contractuales.',
    keyPoints: [
      'Litigios por incumplimiento contractual',
      'Procesos de herencias y sucesiones',
      'Reclamaciones por daños y perjuicios',
      'Disputas sobre propiedad y posesión de bienes'
    ],
    price: 700,
    priceInfo: 'Desde $700 (según cuantía)',
    icon: 'FaGavel',
    image: '/images/derecho-civil.jpg'
  },
  {
    id: 'comercial',
    slug: 'derecho-comercial',
    title: 'Derecho Comercial',
    category: 'Empresarial',
    shortDescription: 'Asesoría en la constitución de sociedades, contratos mercantiles, propiedad intelectual y litigios comerciales.',
    longDescription: 'Brindamos asesoría legal integral para empresas, desde su creación hasta la gestión de operaciones complejas, asegurando el cumplimiento normativo y protegiendo sus activos comerciales.',
    keyPoints: [
      'Constitución y disolución de sociedades',
      'Redacción y revisión de contratos mercantiles',
      'Protección de propiedad intelectual',
      'Cobro de deudas comerciales y litigios'
    ],
    price: 900,
    priceInfo: 'Desde $900',
    icon: 'FaBuilding',
    image: '/images/derecho-comercial.jpg'
  },
  {
    id: 'laboral',
    slug: 'derecho-laboral',
    title: 'Derecho Laboral',
    category: 'Empresarial',
    shortDescription: 'Asesoría para empleadores y defensa de trabajadores en despidos, reclamaciones de beneficios y conflictos laborales.',
    longDescription: 'Ofrecemos representación tanto para empleadores como para trabajadores, garantizando el cumplimiento de la normativa laboral y defendiendo los derechos en disputas contractuales y de terminación laboral.',
    keyPoints: [
      'Demandas por despido intempestivo',
      'Reclamación de beneficios sociales',
      'Elaboración de contratos de trabajo',
      'Asesoría en conflictos y negociaciones'
    ],
    price: 650,
    priceInfo: 'Desde $650',
    icon: 'FaUsers',
    image: '/images/derecho-laboral.jpg'
  },
  {
    id: 'transito',
    slug: 'derecho-de-transito',
    title: 'Derecho de Tránsito',
    category: 'Litigio y Defensa',
    shortDescription: 'Defensa en infracciones, asesoría en accidentes de tránsito y recuperación de licencias de conducir suspendidas.',
    longDescription: 'Nos especializamos en la defensa de sus derechos frente a infracciones y accidentes de tránsito, manejando todos los procedimientos administrativos y judiciales necesarios.',
    keyPoints: [
      'Defensa en infracciones de tránsito',
      'Asesoría y representación en accidentes',
      'Recuperación de licencias suspendidas',
      'Trámites ante autoridades de tránsito'
    ],
    price: 500,
    priceInfo: 'Desde $500',
    icon: 'FaCar',
    image: '/images/derecho-transito.jpg'
  },
  {
    id: 'aduanero',
    slug: 'derecho-aduanero',
    title: 'Derecho Aduanero',
    category: 'Empresarial',
    shortDescription: 'Gestión de recursos administrativos, liberación de mercancías, y defensa en litigios y sanciones aduaneras.',
    longDescription: 'Proveemos asesoría experta para navegar el complejo marco del derecho aduanero, optimizando sus operaciones de comercio exterior y resolviendo disputas con la autoridad aduanera.',
    keyPoints: [
      'Recursos administrativos aduaneros',
      'Liberación de mercancías retenidas',
      'Asesoría en clasificación arancelaria',
      'Defensa en litigios y sanciones'
    ],
    price: 600,
    priceInfo: 'Desde $600',
    icon: 'FaGlobe',
    image: '/images/derecho-aduanero.jpg'
  },
  {
    id: 'familia',
    slug: 'derecho-de-familia',
    title: 'Derecho de Familia',
    category: 'Personal y Familiar',
    shortDescription: 'Asesoría y representación en divorcios, pensiones alimenticias, custodia de hijos y regímenes patrimoniales.',
    longDescription: 'Manejamos los asuntos de familia con la sensibilidad y profesionalismo que merecen, protegiendo sus intereses y buscando soluciones justas y duraderas.',
    keyPoints: [
      'Divorcios de mutuo acuerdo y contenciosos',
      'Fijación y reclamación de pensiones alimenticias',
      'Custodia y tenencia de menores',
      'Adopciones y tutelas'
    ],
    price: 700,
    priceInfo: 'Desde $700',
    icon: 'FaHeart',
    image: '/images/derecho-familia.jpg'
  },
  {
    id: 'cobranzas',
    slug: 'cobro-de-deudas',
    title: 'Cobro de Deudas',
    category: 'Financiero',
    shortDescription: 'Gestión extrajudicial y judicial para la recuperación efectiva de carteras vencidas, pagarés y facturas.',
    longDescription: 'Implementamos estrategias efectivas para la recuperación de sus créditos, desde la negociación amistosa hasta la ejecución judicial de garantías y bienes.',
    keyPoints: [
      'Juicios ejecutivos y monitorios',
      'Cobro de letras de cambio, pagarés y facturas',
      'Negociación de acuerdos de pago',
      'Ejecución de garantías'
    ],
    price: 450,
    priceInfo: 'Desde $450',
    icon: 'FaMoneyBill',
    image: '/images/cobro-deudas.jpg'
  },
  {
    id: 'constitucional',
    slug: 'acciones-constitucionales',
    title: 'Acciones Constitucionales',
    category: 'Litigio y Defensa',
    shortDescription: 'Presentación de acciones de protección, habeas corpus, habeas data y otras garantías constitucionales.',
    longDescription: 'Defendemos sus derechos fundamentales a través de las herramientas que ofrece la Constitución, garantizando una protección efectiva frente a actos de la autoridad pública.',
    keyPoints: [
      'Acciones de protección',
      'Habeas corpus y habeas data',
      'Acceso a la información pública',
      'Medidas cautelares constitucionales'
    ],
    price: 850,
    priceInfo: 'Desde $850',
    icon: 'FaLock',
    image: '/images/acciones-constitucionales.jpg'
  }
];

export const subscriptionPlans = [
  {
    id: 'normal',
    name: 'Normal',
    price: 29.99,
    duration: 'mes',
    popular: false,
    features: [
      'Consultas Básicas del Consejo de la Judicatura',
      'Consultas de servicios del SRI',
      'Sesiones básicas de asesoría legal (2 por mes)',
      'Acceso al Blog Legal con artículos actualizados',
      'Notificaciones de actualizaciones legales'
    ],
    color: 'blue'
  },
  {
    id: 'intermedio',
    name: 'Intermedio',
    price: 49.99,
    duration: 'mes',
    popular: true,
    features: [
      'Consultas de causas penales y civiles',
      'Consultas de multas de tránsito',
      'Sesiones avanzadas de asesoría legal (4 por mes)',
      'Acceso a cursos y eBooks legales premium',
      'Descuentos en servicios adicionales',
      'Acceso al Blog Legal con contenido exclusivo'
    ],
    color: 'green'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99.99,
    duration: 'mes',
    popular: false,
    features: [
      'Acceso ilimitado a todas las consultas disponibles',
      'Sesiones premium de asesoría legal (8 por mes)',
      'Acceso completo a biblioteca de cursos y eBooks',
      'NFTs y servicios Blockchain exclusivos',
      'Redacción ilimitada de certificados y documentos',
      'Prioridad en atención al cliente 24/7',
      'Acceso VIP al Blog Legal'
    ],
    color: 'purple'
  }
];

export const consultationTypes = [
  {
    id: 'consulta-rapida',
    name: 'Consulta Rápida',
    price: 25,
    duration: '30 minutos',
    description: 'Respuestas inmediatas a sus dudas legales básicas',
    features: ['Asesoría telefónica', 'Respuesta en menos de 2 horas', 'Orientación legal básica']
  },
  {
    id: 'consulta-especializada',
    name: 'Consulta Especializada',
    price: 60,
    duration: '1 hora',
    description: 'Análisis detallado de su caso con recomendaciones específicas',
    features: ['Reunión presencial o virtual', 'Análisis de documentos', 'Plan de acción recomendado', 'Seguimiento por 7 días']
  },
  {
    id: 'consulta-premium',
    name: 'Consulta Premium',
    price: 120,
    duration: '2 horas',
    description: 'Asesoría integral con estrategia legal completa',
    features: ['Reunión presencial', 'Revisión exhaustiva de documentos', 'Estrategia legal detallada', 'Documento de recomendaciones', 'Seguimiento por 30 días']
  }
];
