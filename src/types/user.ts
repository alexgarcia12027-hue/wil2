export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  lastLogin?: string;
  createdAt: string;
}
