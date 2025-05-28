import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="register-container">
    <h2>Registrar Usuario</h2>
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <label for="username">Usuario:</label>
      <input id="username" formControlName="username" type="text" />
      <div *ngIf="registerForm.get('username')?.invalid && registerForm.get('username')?.touched" class="error">
        El usuario es requerido.
      </div>

      <label for="password">Contraseña:</label>
      <input id="password" formControlName="password" type="password" />
      <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" class="error">
        La contraseña es requerida.
      </div>

      <label for="role">Rol:</label>
      <select id="role" formControlName="role">
        <option value="director">Director</option>
        <option value="profesor">Profesor</option>
        <option value="alumno">Alumno</option>
        <option value="tutor">Tutor</option>
      </select>

      <button type="submit" [disabled]="registerForm.invalid">Registrar</button>
    </form>
    <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div *ngIf="successMessage" class="success-message">{{ successMessage }}</div>
  </div>
  `,
  styles: [`
    .register-container {
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
    input, select {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.25rem;
    }
    .error {
      color: red;
      font-size: 0.8rem;
    }
    .success-message {
      margin-top: 1rem;
      color: green;
      font-weight: bold;
    }
    button {
      margin-top: 1.5rem;
      width: 100%;
      padding: 0.75rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:disabled {
      background-color: #a0a0a0;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['alumno', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      const success = this.authService.register(user);
      if (success) {
        this.successMessage = 'Usuario registrado con éxito. Ahora puede iniciar sesión.';
        this.errorMessage = '';
        this.registerForm.reset({ role: 'alumno' });
      } else {
        this.errorMessage = 'El usuario ya existe.';
        this.successMessage = '';
      }
    }
  }
}
