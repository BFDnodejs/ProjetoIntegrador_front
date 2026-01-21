import { Injectable } from '@angular/core';
import api from './Api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async login(credentials: { email: string; password: any }) {
    try {
      const response = await api.post('/users/login', credentials);
      
      // Salva o token se o login for bem sucedido
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
