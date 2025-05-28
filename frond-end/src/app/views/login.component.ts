import { Component, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="login-container">
    <h2>Login</h2>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <label for="username">Usuario:</label>
      <input id="username" formControlName="username" type="text" />
      <div *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched" class="error">
        El usuario es requerido.
      </div>

      <label for="password">Contraseña:</label>
      <input id="password" formControlName="password" type="password" />
      <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="error">
        La contraseña es requerida.
      </div>

      <button type="submit" [disabled]="loginForm.invalid">Ingresar</button>
    </form>
    <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    label {
      display: block;
      margin-top: 1rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.25rem;
    }
    .error {
      color: red;
      font-size: 0.8rem;
    }
    button {
      margin-top: 1.5rem;
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:disabled {
      background-color: #a0a0a0;
    }
    .error-message {
      margin-top: 1rem;
      color: red;
      font-weight: bold;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, @Inject(forwardRef(() => AuthService)) private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const success = this.authService.login(username, password);
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      }
    }
  }
}
