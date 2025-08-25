export interface Ebook {
  id: string;
  title: string;
  description: string;
  price: number;
  fileUrl: string;
  createdAt: string; // O Date, dependiendo de la transformación
  updatedAt: string; // O Date
}
