import axios from 'axios';
import { Ebook } from '../types/ebook';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Obtiene todos los ebooks del servidor.
 */
export const getAllEbooks = async (): Promise<Ebook[]> => {
  try {
    const response = await apiClient.get('/ebooks');
    return response.data;
  } catch (error) {
    console.error('Error fetching ebooks:', error);
    throw error;
  }
};

/**
 * Obtiene un ebook específico por su ID.
 */
export const getEbookById = async (id: string): Promise<Ebook> => {
  try {
    const response = await apiClient.get(`/ebooks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ebook with id ${id}:`, error);
    throw error;
  }
};

/**
 * Crea un nuevo ebook.
 */
export const createEbook = async (ebookData: Partial<Ebook>): Promise<Ebook> => {
  try {
    const response = await apiClient.post('/ebooks', ebookData);
    return response.data;
  } catch (error) {
    console.error('Error creating ebook:', error);
    throw error;
  }
};

/**
 * Actualiza un ebook existente.
 */
export const updateEbook = async (id: string, ebookData: Partial<Ebook>): Promise<Ebook> => {
  try {
    const response = await apiClient.put(`/ebooks/${id}`, ebookData);
    return response.data;
  } catch (error) {
    console.error(`Error updating ebook ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina un ebook.
 */
export const deleteEbook = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/ebooks/${id}`);
  } catch (error) {
    console.error(`Error deleting ebook ${id}:`, error);
    throw error;
  }
};