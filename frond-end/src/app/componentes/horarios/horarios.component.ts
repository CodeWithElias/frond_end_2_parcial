import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  horarios: any[] = [];
  mostrarModalDetalle: boolean = false;
  mostrarModalCrear: boolean = false;
  mostrarModalEditar: boolean = false;
  horarioSeleccionado: any = null;
  nuevoHorario: any = {
    dia_semana: '',
    hora_inicio: '',
    hora_fin: '',
    aula: '',
    curso_materia: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarHorarios();
  }

  cargarHorarios(): void {
    this.apiService.getHorarios().subscribe({
      next: (data) => {
        this.horarios = data;
      },
      error: (err) => {
        console.error('Error al obtener horarios:', err);
      }
    });
  }

  mostrarDetalleHorario(id: number): void {
    this.apiService.getHorarioById(id).subscribe({
      next: (data) => {
        this.horarioSeleccionado = data;
        this.mostrarModalDetalle = true;
      },
      error: (err) => {
        console.error('Error al obtener detalle de horario:', err);
      }
    });
  }

  abrirModalCrear(): void {
    this.nuevoHorario = {
      dia_semana: '',
      hora_inicio: '',
      hora_fin: '',
      aula: '',
      curso_materia: ''
    };
    this.mostrarModalCrear = true;
  }

  crearHorario(): void {
    this.apiService.crearHorario(this.nuevoHorario).subscribe({
      next: () => {
        this.mostrarModalCrear = false;
        this.cargarHorarios();
      },
      error: (err) => {
        console.error('Error al crear horario:', err);
      }
    });
  }

  abrirModalEditar(id: number): void {
    this.apiService.getHorarioById(id).subscribe({
      next: (data) => {
        this.horarioSeleccionado = data;
        this.mostrarModalEditar = true;
      },
      error: (err) => {
        console.error('Error al obtener horario para editar:', err);
      }
    });
  }

  actualizarHorario(): void {
    if (!this.horarioSeleccionado) return;
    this.apiService.actualizarHorario(this.horarioSeleccionado.id, this.horarioSeleccionado).subscribe({
      next: () => {
        this.mostrarModalEditar = false;
        this.cargarHorarios();
      },
      error: (err) => {
        console.error('Error al actualizar horario:', err);
      }
    });
  }

  eliminarHorario(id: number): void {
    if (!confirm('¿Está seguro de eliminar este horario?')) return;
    this.apiService.eliminarHorario(id).subscribe({
      next: () => {
        this.cargarHorarios();
      },
      error: (err) => {
        console.error('Error al eliminar horario:', err);
      }
    });
  }

  cerrarModal(tipo: string): void {
    if (tipo === 'detalle') this.mostrarModalDetalle = false;
    else if (tipo === 'crear') this.mostrarModalCrear = false;
    else if (tipo === 'editar') this.mostrarModalEditar = false;
  }
}
