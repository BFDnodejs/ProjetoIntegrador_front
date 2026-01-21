import { Injectable } from '@angular/core';
import api from './Api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async register(userData: { email: string; password: any }) {
  try {

    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error: any) {

    throw error.response?.data || { message: 'Erro ao processar cadastro' };
  }
}

  async login(credentials: { email: string; password: any }) {
    try {
      const response = await api.post('/users/login', credentials);
      

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Erro ao conectar com o servidor' };
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
