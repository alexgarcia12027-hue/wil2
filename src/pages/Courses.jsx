import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCheck, FaLock, FaClock, FaUser, FaStar, FaGraduationCap, FaFilter, FaSearch, FaShoppingCart } from 'react-icons/fa';

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userProgress, setUserProgress] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'all', name: 'Todos los Cursos' },
    { id: 'penal', name: 'Derecho Penal' },
    { id: 'civil', name: 'Derecho Civil' },
    { id: 'comercial', name: 'Derecho Comercial' },
    { id: 'laboral', name: 'Derecho Laboral' },
    { id: 'transito', name: 'Derecho de Tránsito' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Derecho Penal Básico',
      instructor: 'Dr. Wilson Ipiales',
      description: 'Aprenda los fundamentos del derecho penal ecuatoriano con casos prácticos y jurisprudencia actualizada.',
      duration: '8 semanas',
      totalLessons: 24,
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.8,
      students: 245,
      image: '/images/courses/penal.jpg',
      category: 'penal',
      level: 'Básico',
      featured: true,
      lessons: [
        {
          id: 1,
          title: 'Introducción al Derecho Penal',
          duration: '15:30',
          videoUrl: 'https://example.com/video1.mp4',
          description: 'Conceptos básicos y fundamentos del derecho penal ecuatoriano',
          completed: false
        },
        {
          id: 2,
          title: 'Elementos del Delito',
          duration: '22:15',
          videoUrl: 'https://example.com/video2.mp4',
          description: 'Análisis detallado de los elementos constitutivos del delito',
          completed: false
        },
        {
          id: 3,
          title: 'Tipos Penales',
          duration: '18:45',
          videoUrl: 'https://example.com/video3.mp4',
          description: 'Clasificación y estudio de los tipos penales más comunes',
          completed: false
        }
      ]
    },
    {
      id: 2,
      title: 'Derecho Civil Avanzado',
      instructor: 'Dr. Wilson Ipiales',
      description: 'Profundice en el derecho civil y sus aplicaciones prácticas en contratos y obligaciones.',
      duration: '12 semanas',
      totalLessons: 36,
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.9,
      students: 189,
      image: '/images/courses/civil.jpg',
      category: 'civil',
      level: 'Avanzado',
      bestseller: true,
      lessons: [
        {
          id: 1,
          title: 'Contratos Civiles',
          duration: '20:00',
          videoUrl: 'https://example.com/video4.mp4',
          description: 'Análisis completo de contratos y sus elementos esenciales',
          completed: false
        },
        {
          id: 2,
          title: 'Responsabilidad Civil',
          duration: '25:30',
          videoUrl: 'https://example.com/video5.mp4',
          description: 'Estudio de la responsabilidad civil extracontractual',
          completed: false
        }
      ]
    },
    {
      id: 3,
      title: 'Derecho de Tránsito Práctico',
      instructor: 'Dr. Wilson Ipiales',
      description: 'Todo sobre las leyes de tránsito, procedimientos y defensa efectiva en casos de infracciones.',
      duration: '6 semanas',
      totalLessons: 18,
      price: 99.99,
      originalPrice: 129.99,
      rating: 4.7,
      students: 356,
      image: '/images/courses/transito.jpg',
      category: 'transito',
      level: 'Intermedio',
      popular: true,
      lessons: [
        {
          id: 1,
          title: 'Normativa de Tránsito',
          duration: '16:45',
          videoUrl: 'https://example.com/video6.mp4',
          description: 'Leyes y reglamentos de tránsito vigentes en Ecuador',
          completed: false
        },
        {
          id: 2,
          title: 'Infracciones y Sanciones',
          duration: '19:20',
          videoUrl: 'https://example.com/video7.mp4',
          description: 'Tipos de infracciones y procedimientos sancionatorios',
          completed: false
        }
      ]
    },
    {
      id: 4,
      title: 'Derecho Comercial para Empresarios',
      instructor: 'Dr. Wilson Ipiales',
      description: 'Curso especializado para empresarios y emprendedores sobre derecho mercantil y societario.',
      duration: '10 semanas',
      totalLessons: 30,
      price: 179.99,
      originalPrice: 229.99,
      rating: 4.8,
      students: 123,
      image: '/images/courses/comercial.jpg',
      category: 'comercial',
      level: 'Intermedio',
      lessons: [
        {
          id: 1,
          title: 'Constitución de Empresas',
          duration: '24:15',
          videoUrl: 'https://example.com/video8.mp4',
          description: 'Proceso completo de constitución de sociedades',
          completed: false
        }
      ]
    },
    {
      id: 5,
      title: 'Derecho Laboral Actualizado',
      instructor: 'Dr. Wilson Ipiales',
      description: 'Normativa laboral vigente, derechos del trabajador y procedimientos administrativos.',
      duration: '8 semanas',
      totalLessons: 24,
      price: 129.99,
      originalPrice: 169.99,
      rating: 4.6,
      students: 198,
      image: '/images/courses/laboral.jpg',
      category: 'laboral',
      level: 'Básico',
      lessons: [
        {
          id: 1,
          title: 'Contratos de Trabajo',
          duration: '18:30',
          videoUrl: 'https://example.com/video9.mp4',
          description: 'Tipos de contratos laborales y sus características',
          completed: false
        }
      ]
    }
  ];

  const filteredCourses = courses
    .filter(course => 
      (selectedCategory === 'all' || course.category === selectedCategory) &&
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'students':
          return b.students - a.students;
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const VideoPlayer = ({ lesson }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    const handleTimeUpdate = (e) => {
      setCurrentTime(e.target.currentTime);
      const progressPercent = (e.target.currentTime / e.target.duration) * 100;
      updateLessonProgress(lesson.id, progressPercent);
    };

    const togglePlay = () => {
      const video = document.getElementById('course-video');
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    };

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
      <div className="bg-black rounded-lg overflow-hidden">
        <div className="relative">
          <video
            id="course-video"
            className="w-full h-64 md:h-96"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
            onEnded={() => {
              setIsPlaying(false);
              markLessonAsCompleted(lesson.id);
            }}
          >
            <source src={lesson.videoUrl} type="video/mp4" />
            Su navegador no soporta el elemento de video.
          </video>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-300"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(currentTime / duration) * 100 || 0}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const updateLessonProgress = (lessonId, progress) => {
    setUserProgress(prev => ({
      ...prev,
      [lessonId]: progress
    }));
  };

  const markLessonAsCompleted = (lessonId) => {
    setUserProgress(prev => ({
      ...prev,
      [lessonId]: 100
    }));
  };

  const getCourseProgress = (course) => {
    if (!course.lessons) return 0;
    const totalLessons = course.lessons.length;
    const completedLessons = course.lessons.filter(lesson => 
      userProgress[lesson.id] === 100
    ).length;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (selectedCourse) {
    const currentLessonData = selectedCourse.lessons[currentLesson];
    
    return (
      <div className="min-h-screen pt-16 bg-gray-50">
        <Helmet>
          <title>{selectedCourse.title} | Cursos Legales</title>
          <meta name="description" content={selectedCourse.description} />
        </Helmet>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
            >
              ← Volver a los cursos
            </button>
            <h1 className="text-3xl font-bold text-gray-900">{selectedCourse.title}</h1>
            <p className="text-gray-600 mt-2">{selectedCourse.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">{currentLessonData.title}</h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Lección {currentLesson + 1} de {selectedCourse.lessons.length}
                    </span>
                    <span className="text-sm text-gray-500">
                      {currentLessonData.duration}
                    </span>
                  </div>
                </div>

                <VideoPlayer lesson={currentLessonData} />

                <div className="mt-6">
                  <h3 className="font-bold text-lg mb-2">Descripción</h3>
                  <p className="text-gray-600">{currentLessonData.description}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4">Lecciones del Curso</h3>
                <div className="space-y-2">
                  {selectedCourse.lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        index === currentLesson
                          ? 'bg-blue-100 text-blue-800'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {userProgress[lesson.id] === 100 ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaPlay className="text-gray-400" />
                          )}
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-sm text-gray-500">{lesson.duration}</p>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <Helmet>
        <title>Cursos de Derecho | Abogado Wilson Ipiales</title>
        <meta name="description" content="Cursos profesionales de derecho impartidos por el Dr. Wilson Ipiales. Aprende derecho penal, civil, comercial y más con casos prácticos." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <FaGraduationCap className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cursos de Derecho</h1>
            <p className="text-xl text-blue-100 mb-8">
              Aprende derecho de la mano de expertos profesionales con casos prácticos y jurisprudencia actualizada
            </p>
            
            <div className="max-w-md mx-auto relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 sticky top-24"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaFilter className="mr-2" />
                  Categorías
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Ordenar por</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Nombre</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor Valorados</option>
                  <option value="students">Más Estudiantes</option>
                </select>
              </div>
            </motion.div>
          </div>

          {/* Courses Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'Todos los Cursos' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <span className="text-gray-600">
                {filteredCourses.length} cursos disponibles
              </span>
            </div>

            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course, index) => {
                  const progress = getCourseProgress(course);
                  
                  return (
                    <motion.div
                      key={course.id}
                      layout
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={fadeIn}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FaGraduationCap className="text-6xl text-blue-600" />
                        </div>
                        
                        <div className="absolute top-2 left-2 flex flex-col space-y-1">
                          {course.bestseller && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                              Bestseller
                            </span>
                          )}
                          {course.featured && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                              Destacado
                            </span>
                          )}
                          {course.popular && (
                            <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-semibold">
                              Popular
                            </span>
                          )}
                        </div>

                        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          ${course.price}
                        </div>

                        {course.originalPrice > course.price && (
                          <div className="absolute top-10 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            -{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-blue-600 font-medium capitalize">{course.category}</span>
                          <span className="text-sm text-gray-500">{course.level}</span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <FaClock className="mr-1" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <FaUser className="mr-1" />
                            {course.totalLessons} lecciones
                          </div>
                          <div className="flex items-center">
                            <FaStar className="mr-1 text-yellow-400" />
                            {course.rating}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-blue-600">
                                ${course.price}
                              </span>
                              {course.originalPrice > course.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${course.originalPrice}
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-600">
                              {course.students} estudiantes
                            </span>
                          </div>
                        </div>

                        {progress > 0 && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progreso</span>
                              <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCourse(course)}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          >
                            {progress > 0 ? 'Continuar' : 'Comenzar'}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                            title="Agregar al carrito"
                          >
                            <FaShoppingCart />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>

            {filteredCourses.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <p className="text-gray-500 text-lg">
                  No se encontraron cursos que coincidan con tu búsqueda.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
