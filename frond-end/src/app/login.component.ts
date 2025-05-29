import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Login</h2>
    <p>Esta es la vista de login.</p>
  `
})
export class LoginComponent {}
