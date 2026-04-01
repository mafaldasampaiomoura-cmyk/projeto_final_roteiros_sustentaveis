import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  errorMessage = signal('');
  successMessage = signal('')


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage.set('');

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage.set('Preenche o email e a palavra-passe.');
      return;
    }

    if (!this.email.includes('@')) {
      this.errorMessage.set('Introduz um email válido.');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('session', JSON.stringify(response.session));
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/routes']);
      },
      error: (error: any) => {
        console.error('Erro no login:', error);
        this.errorMessage.set('Email ou palavra-passe incorretos.');
      },
    });
  }
}