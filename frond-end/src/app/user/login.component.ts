import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, LoginResponse } from './api.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  mensaje = '';
  error = '';
  showPassword = false;

  constructor(
    @Inject(ApiService) private apiService: ApiService,
    @Inject(UserService) private userService: UserService,
    private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.mensaje = '';
    this.error = '';
    this.apiService.login(this.username, this.password).subscribe({
      next: (response: LoginResponse) => {
        this.mensaje = response.mensaje;
        this.userService.setUsuario(response.usuario);
        this.router.navigate(['/profile']);
      },
      error: (err: any) => {
        this.error = 'Error en el inicio de sesión. Verifica tus credenciales.';
        console.error(err);
      }
    });
  }
}
