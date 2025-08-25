import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a las peticiones
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Funciones de Lectura ---
export const getAllCourses = async () => {
  try {
    const response = await apiClient.get('/courses');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al obtener los cursos';
  }
};

export const getCourseById = async (id: string) => {
  try {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al obtener el curso';
  }
};

// --- Funciones de Escritura (Admin) ---
export const createCourse = async (courseData: any) => {
  try {
    const response = await apiClient.post('/courses', courseData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al crear el curso';
  }
};

export const updateCourse = async (id: string, courseData: any) => {
  try {
    const response = await apiClient.put(`/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al actualizar el curso';
  }
};

export const deleteCourse = async (id: string) => {
  try {
    await apiClient.delete(`/courses/${id}`);
  } catch (error) {
    throw error.response?.data?.error || 'Error al eliminar el curso';
  }
};