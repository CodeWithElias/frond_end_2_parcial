import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../servicio/api.service';
import { Estudiante } from '../../modelo/model';

@Component({
  selector: 'app-registrar-asistencia-calificacion-participacion-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-asistencia-calificacion-participacion-modal.component.html',
  styleUrls: ['./registrar-asistencia-calificacion-participacion-modal.component.css']
})
export class RegistrarAsistenciaCalificacionParticipacionModalComponent {
  @Input() estudiante: Estudiante | null = null;
  @Input() docenteId: number | null = null;
  @Input() curso: string = '';
  @Input() materia: string = '';
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  // En tu componente TypeScript
  //fechaAsistencia: string = new Date().toISOString().split('T')[0];
  fechaAsistencia: string = new Date().toISOString().split('T')[0];
  estadoAsistencia: string = 'presente';
  justificacion: string = '';

  // Campos para bimestre (único para todo)
  bimestreId: number | null = null;

  // Campos para calificación
  calificacion: number | null = null;
  observacionCalificacion: string = '';

  // Campos para participación
  observacionParticipacion: string = '';
  fechaParticipacion: string = '';

  mensaje: string = '';
  activeTab: 'asistencia' | 'calificacion' | 'participacion' = 'asistencia';

  constructor(private apiService: ApiService) {}

  cerrar() {
    this.visible = false;
    this.mensaje = '';
    this.close.emit();
  }

  setTab(tab: 'asistencia' | 'calificacion' | 'participacion') {
    this.activeTab = tab;
    this.mensaje = '';
  }

  registrarAsistencia() {
    if (!this.estudiante || !this.bimestreId) {
      this.mensaje = 'Faltan datos para registrar asistencia.';
      return;
    }
    if (!this.curso || isNaN(Number(this.curso))) {
      this.mensaje = 'Curso inválido.';
      return;
    }
    if (!this.materia || isNaN(Number(this.materia))) {
      this.mensaje = 'Materia inválida.';
      return;
    }
    let fechaFormateada = this.fechaAsistencia;
    // Si fechaAsistencia es un objeto Date, convertir a string ISO
    if (Object.prototype.toString.call(this.fechaAsistencia) === '[object Date]') {
      fechaFormateada = (this.fechaAsistencia as unknown as Date).toISOString().split('T')[0];
    }
    const data = {
      estudiante: this.estudiante.id,
      curso: parseInt(this.curso, 10),
      materia: parseInt(this.materia, 10),
      bimestre: this.bimestreId,
      fecha: fechaFormateada,
      estado: this.estadoAsistencia,
      justificacion: this.justificacion
    };
    console.log('Datos a enviar en registrarAsistencia:', data);
    this.apiService.registrarAsistencia(data).subscribe({
      next: () => {
        this.mensaje = 'Asistencia registrada correctamente.';
      },
      error: (err) => {
        // Mostrar mensaje de error completo si está disponible
        if (err.error) {
          this.mensaje = 'Error al registrar asistencia: ' + JSON.stringify(err.error);
        } else {
          this.mensaje = 'Error al registrar asistencia: ' + err.message;
        }
      }
    });
  }

  registrarCalificacion() {
    if (!this.docenteId || !this.estudiante || !this.bimestreId) {
      this.mensaje = 'Faltan datos para registrar calificación.';
      return;
    }
    const data = {
      docente_id: this.docenteId,
      curso: parseInt(this.curso, 10),
      materia: parseInt(this.materia, 10),
      bimestre: this.bimestreId,
      nota: this.calificacion,
      observacion: this.observacionCalificacion,
      estudiante: this.estudiante.id
    };
    this.apiService.registrarCalificacion(data).subscribe({
      next: () => {
        this.mensaje = 'Calificación registrada correctamente.';
      },
      error: (err) => {
        this.mensaje = 'Error al registrar calificación: ' + err.message;
      }
    });
  }

  registrarParticipacion() {
    if (!this.docenteId || !this.estudiante || !this.bimestreId) {
      this.mensaje = 'Faltan datos para registrar participación.';
      return;
    }
    const data = {
      docente_id: this.docenteId,
      curso: parseInt(this.curso, 10),
      materia: parseInt(this.materia, 10),
      bimestre: this.bimestreId,
      nota: this.calificacion,
      observacion: this.observacionParticipacion,
      estudiante: this.estudiante.id
    };
    this.apiService.registrarParticipacion(data).subscribe({
      next: () => {
        this.mensaje = 'Participación registrada correctamente.';
      },
      error: (err) => {
        this.mensaje = 'Error al registrar participación: ' + err.message;
      }
    });
  }
}
