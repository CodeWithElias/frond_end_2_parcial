import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';
import { Estudiante } from '../../modelo/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  mostrarModal: boolean = false;
  estudianteSeleccionado: Estudiante | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.apiService.getEstudiantes().subscribe({
      next: (data) => {
        console.log('Datos recibidos de estudiantes:', data);
        this.estudiantes = data;
      },
      error: (err) => {
        console.error('Error al obtener estudiantes:', err);
      }
    });
  }

  abrirModalEditar(estudiante: Estudiante) {
    this.estudianteSeleccionado = JSON.parse(JSON.stringify(estudiante)); // Clonar objeto para evitar cambios directos
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.estudianteSeleccionado = null;
  }

  guardarCambios() {
    if (!this.estudianteSeleccionado) return;

    // Preparar objeto simplificado para enviar
    const estudianteParaActualizar = {
      id: this.estudianteSeleccionado.id,
      persona: {
        ci: this.estudianteSeleccionado.persona.ci,
        nombres: this.estudianteSeleccionado.persona.nombres,
        apellidos: this.estudianteSeleccionado.persona.apellidos,
        genero: this.estudianteSeleccionado.persona.genero,
        fecha_nacimiento: this.estudianteSeleccionado.persona.fecha_nacimiento,
        direccion: this.estudianteSeleccionado.persona.direccion,
        telefono: this.estudianteSeleccionado.persona.telefono,
        usuario: {
          id: this.estudianteSeleccionado.persona.usuario.id,
          correo: this.estudianteSeleccionado.persona.usuario.correo,
          username: this.estudianteSeleccionado.persona.usuario.username,
          rol: typeof this.estudianteSeleccionado.persona.usuario.rol === 'object' ? this.estudianteSeleccionado.persona.usuario.rol.id : this.estudianteSeleccionado.persona.usuario.rol
        }
      },
      rude: this.estudianteSeleccionado.rude
    };

    this.apiService.actualizarEstudiante(this.estudianteSeleccionado.id, estudianteParaActualizar).subscribe({
      next: () => {
        this.cerrarModal();
        this.cargarEstudiantes();
      },
      error: (err) => {
        console.error('Error al actualizar estudiante:', err);
      }
    });
  }
}
