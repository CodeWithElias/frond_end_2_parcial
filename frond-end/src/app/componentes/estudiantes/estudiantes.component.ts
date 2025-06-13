import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';
import { Estudiante } from '../../modelo/model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegistrarAsistenciaCalificacionParticipacionModalComponent } from '../asistencia-calificacion/registrar-asistencia-calificacion-participacion-modal.component';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule, RegistrarAsistenciaCalificacionParticipacionModalComponent],
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  mostrarModal: boolean = false;
  estudianteSeleccionado: Estudiante | null = null;
  cursoId: number | null = null;
  docenteId: number | null = null;
  curso: string = '';
  materia: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cursoId = params['cursoId'] ? +params['cursoId'] : null;
      this.docenteId = params['docenteId'] ? +params['docenteId'] : null;
      this.curso = params['curso'] ? params['curso'].toString() : '';
      this.materia = params['materia'] ? params['materia'].toString() : '';
      this.cargarEstudiantes();
    });
  }

  cargarEstudiantes() {
    if (this.cursoId !== null && this.docenteId !== null) {
      this.apiService.getEstudiantesPorCursoDocente(this.cursoId, this.docenteId).subscribe({
        next: (data) => {
          console.log('Datos recibidos de estudiantes por curso y docente:', data);
          this.estudiantes = data;
        },
        error: (err) => {
          console.error('Error al obtener estudiantes por curso y docente:', err);
        }
      });
    } else {
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
  }

  abrirModalRegistrar(estudiante: Estudiante) {
    this.estudianteSeleccionado = estudiante;
    // No modificar curso y materia aquí, ya vienen asignados correctamente
    console.log('abrirModalRegistrar - curso:', this.curso, 'materia:', this.materia);
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
