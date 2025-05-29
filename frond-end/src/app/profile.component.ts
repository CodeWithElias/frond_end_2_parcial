import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Perfil de Usuario</h2>
    <p>Esta es la vista de perfil de usuario.</p>
  `
})
export class ProfileComponent {}
