import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterResponse } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [  FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {
  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onSubmit() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response: RegisterResponse) => {
        console.log ('REGISTER OK:', response);
        this.router.navigate(['/login']);
      }, 
      error: (error) => {
        console.log('REGISTER ERROR:', error);
      },
    });
  }
}
