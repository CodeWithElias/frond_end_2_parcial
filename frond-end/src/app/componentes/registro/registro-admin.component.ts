import { Component } from '@angular/core';
import { ApiService } from '../../servicio/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroAdminComponent {
  persona = {
    usuario: {
      username: '',
      correo: '',
      rol: 1,
      password: ''
    }
  };

  mensaje: string = '';
  error: string = '';

  constructor(private apiService: ApiService) {}

  registrar() {
    this.mensaje = '';
    this.error = '';
    // Fijar rol a 1 (administrador) directamente
    this.persona.usuario.rol = 1;
    this.apiService.registrarPersona({ persona: this.persona }).subscribe({
      next: (response) => {
        this.mensaje = 'Registro exitoso';
        this.persona = {
          usuario: {
            username: '',
            correo: '',
            rol: 1,
            password: ''
          }
        };
      },
      error: (err) => {
        this.error = 'Error en el registro: ' + (err.error?.mensaje || err.message || 'Error desconocido');
      }
    });
  }
}
