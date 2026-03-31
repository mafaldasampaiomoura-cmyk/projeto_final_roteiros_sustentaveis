import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';
  errorMessage = signal('');
  successMessage =signal('');
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  onSubmit() {
  this.errorMessage.set('');
  this.successMessage.set('');

  this.authService.register(this.name, this.email, this.password).subscribe({
    next: (response: any) => {
      console.log('REGISTER OK:', response);

      this.successMessage.set('Utilizador criado com sucesso!');
      this.errorMessage.set('');

      this.name = '';
      this.email = '';
      this.password = '';
    },
    error: (error) => {
      console.error('REGISTER ERROR:', error);

      const backendMessage =
        error?.error?.message ||
        error?.error?.error ||
        '';

      if (
        backendMessage.includes('already registered') ||
        backendMessage.includes('User already registered')
      ) {
        this.errorMessage.set('Este email já está registado.');
      } else if (backendMessage.includes('Password')) {
        this.errorMessage.set('A password não cumpre os requisitos.');
      } else {
        this.errorMessage.set('Erro ao criar utilizador.');
      }

      this.successMessage.set('');
    }
  });
}
 
}
