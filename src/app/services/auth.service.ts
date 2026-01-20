import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from './api.service';

interface Credentials {
  email: string;
  password: string;
}

interface UserView {
  id: number;
  email: string;
  role: 'EMPLOYEE';
}

interface AuthResponse {
  token: string;
  user: UserView;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  register(data: Credentials) {
    // se seu register NÃO retorna token, troque o tipo de retorno
    return this.api.post<UserView>('/register', data);
  }

  login(data: Credentials) {
    return this.api.post<AuthResponse>('/login', data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
