import { Component } from '@angular/core';
import { ApiService } from '../../servicio/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-profesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-profesor.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroProfesorComponent {
  persona = {
    usuario: {
      username: '',
      correo: '',
      rol: 2,
      password: ''
    },
    ci: '',
    nombres: '',
    apellidos: '',
    genero: '',
    fecha_nacimiento: '',
    direccion: '',
    telefono: ''
  };

  profesion: string = '';
  fecha_contratacion: string = '';

  mensaje: string = '';
  error: string = '';

  constructor(private apiService: ApiService) {}

  registrar() {
    this.mensaje = '';
    this.error = '';
    const dataToSend = {
      persona: this.persona,
      profesion: this.profesion,
      fecha_contratacion: this.fecha_contratacion
    };
    this.apiService.registrarPersona(dataToSend).subscribe({
      next: (response) => {
        this.mensaje = 'Registro exitoso';
        this.persona = {
          usuario: {
            username: '',
            correo: '',
            rol: 2,
            password: ''
          },
          ci: '',
          nombres: '',
          apellidos: '',
          genero: '',
          fecha_nacimiento: '',
          direccion: '',
          telefono: ''
        };
        this.profesion = '';
        this.fecha_contratacion = '';
      },
      error: (err) => {
        this.error = 'Error en el registro: ' + (err.error?.mensaje || err.message || 'Error desconocido');
      }
    });
  }
}
