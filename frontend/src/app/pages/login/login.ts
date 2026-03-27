import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginResponse } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: LoginResponse) => {
        console.log('LOGIN OK:', response);

        localStorage.setItem('session', JSON.stringify(response.session));
        localStorage.setItem('user', JSON.stringify(response.user));

        this.authService.getMe().subscribe(res => { //faz login, guarda o token, chame o /me automaticamente e o console mostra user vindo do backend 
          console.log ('USER FROM /me:', res)
        });

        this.router.navigate(['/routes']); //redireciona para o routes.
      },
      error: (error) => {
        console.error('LOGIN ERROR:', error);
      },
    });
  }
}