import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
  inscripciones: any[] = [];

  inscripcionSeleccionada: any = null;
  mostrarModalDetalle: boolean = false;
  mostrarModalCrear: boolean = false;
  mostrarModalEditar: boolean = false;

  nuevaInscripcion = {
    fecha_inscripcion: '',
    estudiante: null,
    curso: null,
    gestion: null
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    this.apiService.getInscripciones().subscribe({
      next: (data) => {
        console.log('Datos recibidos de inscripciones:', data);
        this.inscripciones = data;
      },
      error: (err) => {
        console.error('Error al obtener inscripciones:', err);
      }
    });
  }

  mostrarDetalle(id: number): void {
    this.apiService.getInscripcionById(id).subscribe({
      next: (data) => {
        this.inscripcionSeleccionada = data;
        this.mostrarModalDetalle = true;
      },
      error: (err) => {
        console.error('Error al obtener inscripcion:', err);
      }
    });
  }

  abrirModalCrear(): void {
    this.nuevaInscripcion = {
      fecha_inscripcion: '',
      estudiante: null,
      curso: null,
      gestion: null
    };
    this.mostrarModalCrear = true;
  }

  crearInscripcion(): void {
    this.apiService.crearInscripcion(this.nuevaInscripcion).subscribe({
      next: (data) => {
        console.log('Inscripcion creada:', data);
        this.mostrarModalCrear = false;
        this.cargarInscripciones();
      },
      error: (err) => {
        console.error('Error al crear inscripcion:', err);
      }
    });
  }

  abrirModalEditar(id: number): void {
    this.apiService.getInscripcionById(id).subscribe({
      next: (data) => {
        this.inscripcionSeleccionada = data;
        this.mostrarModalEditar = true;
      },
      error: (err) => {
        console.error('Error al obtener inscripcion para editar:', err);
      }
    });
  }

  actualizarInscripcion(): void {
    if (!this.inscripcionSeleccionada) return;
    this.apiService.actualizarInscripcion(this.inscripcionSeleccionada.id, this.inscripcionSeleccionada).subscribe({
      next: (data) => {
        console.log('Inscripcion actualizada:', data);
        this.mostrarModalEditar = false;
        this.cargarInscripciones();
      },
      error: (err) => {
        console.error('Error al actualizar inscripcion:', err);
      }
    });
  }

  cerrarModal(tipo: string): void {
    if (tipo === 'detalle') {
      this.mostrarModalDetalle = false;
      this.inscripcionSeleccionada = null;
    } else if (tipo === 'crear') {
      this.mostrarModalCrear = false;
    } else if (tipo === 'editar') {
      this.mostrarModalEditar = false;
      this.inscripcionSeleccionada = null;
    }
  }
}
