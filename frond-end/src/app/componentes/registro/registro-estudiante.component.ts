import { Component } from '@angular/core';
import { ApiService } from '../../servicio/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroEstudianteComponent {
  persona = {
    usuario: {
      username: '',
      correo: '',
      rol: 3,
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

  rude: string = '';

  mensaje: string = '';
  error: string = '';

  constructor(private apiService: ApiService) {}

  registrar() {
    this.mensaje = '';
    this.error = '';
    const dataToSend = {
      persona: this.persona,
      rude: this.rude
    };
    this.apiService.registrarPersona(dataToSend).subscribe({
      next: (response) => {
        this.mensaje = 'Registro exitoso';
        this.persona = {
          usuario: {
            username: '',
            correo: '',
            rol: 3,
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
        this.rude = '';
      },
      error: (err) => {
        this.error = 'Error en el registro: ' + (err.error?.mensaje || err.message || 'Error desconocido');
      }
    });
  }
}
