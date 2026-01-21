import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up-login.component.html',
  styleUrl: './sign-up-login.component.css'
})
export class SignUpLoginComponent {
  userData = {
    email: '',
    password: ''
  };

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      await this.authService.register(this.userData);
      this.successMessage = 'Cadastro realizado com sucesso! Redirecionando...';
      
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

    } catch (err: any) {
      this.errorMessage = err.message || 'Erro ao realizar cadastro.';
    } finally {
      this.loading = false;
    }
  }
}
