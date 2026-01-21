import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.errorMessage = '';

    try {
      await this.authService.login(this.loginData);
      console.log('Login realizado com sucesso!');
      this.router.navigate(['/home']); // Redireciona após o login
    } catch (err: any) {
      this.errorMessage = err.message || 'Falha ao realizar login.';
    } finally {
      this.loading = false;
    }
  }
}
