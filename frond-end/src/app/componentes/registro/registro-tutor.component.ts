import { Component } from '@angular/core';
import { ApiService } from '../../servicio/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-tutor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-tutor.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroTutorComponent {
  persona = {
    usuario: {
      username: '',
      correo: '',
      rol: 4, // rol de padre de familia
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

  mensaje: string = '';
  error: string = '';

  constructor(private apiService: ApiService) {}

  registrar() {
    this.mensaje = '';
    this.error = '';
    const dataToSend = {
      persona: this.persona
    };
    this.apiService.registrarPersona(dataToSend).subscribe({
      next: (response) => {
        this.mensaje = 'Registro exitoso';
        this.persona = {
          usuario: {
            username: '',
            correo: '',
            rol: 4,
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
      },
      error: (err) => {
        this.error = 'Error en el registro: ' + (err.error?.mensaje || err.message || 'Error desconocido');
      }
    });
  }
}
