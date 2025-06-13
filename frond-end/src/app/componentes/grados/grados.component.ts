import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-grados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grados.component.html',
  styleUrls: ['./grados.component.css']
})
export class GradosComponent implements OnInit {
  grados: any[] = [];
  niveles: any[] = [];
  mostrarModalDetalle: boolean = false;
  mostrarModalCrear: boolean = false;
  mostrarModalEditar: boolean = false;
  gradoSeleccionado: any = null;
  nuevoGrado: any = {
    nombre: '',
    nivel: null
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarGrados();
    this.cargarNiveles();
  }

  cargarGrados(): void {
    this.apiService.getGrados().subscribe({
      next: (data) => {
        this.grados = data;
      },
      error: (err) => {
        console.error('Error al obtener grados:', err);
      }
    });
  }

  cargarNiveles(): void {
    this.apiService.getNiveles().subscribe({
      next: (data) => {
        this.niveles = data;
      },
      error: (err) => {
        console.error('Error al obtener niveles:', err);
      }
    });
  }

  mostrarDetalleGrado(id: number): void {
    this.apiService.getGradoById(id).subscribe({
      next: (data) => {
        this.gradoSeleccionado = data;
        this.mostrarModalDetalle = true;
      },
      error: (err) => {
        console.error('Error al obtener detalle de grado:', err);
      }
    });
  }

  abrirModalCrear(): void {
    this.nuevoGrado = {
      nombre: '',
      nivel: null
    };
    this.mostrarModalCrear = true;
  }

  crearGrado(): void {
    this.apiService.crearGrado(this.nuevoGrado).subscribe({
      next: () => {
        this.mostrarModalCrear = false;
        this.cargarGrados();
      },
      error: (err) => {
        console.error('Error al crear grado:', err);
      }
    });
  }

  abrirModalEditar(id: number): void {
    this.apiService.getGradoById(id).subscribe({
      next: (data) => {
        this.gradoSeleccionado = data;
        this.mostrarModalEditar = true;
      },
      error: (err) => {
        console.error('Error al obtener grado para editar:', err);
      }
    });
  }

  actualizarGrado(): void {
    if (!this.gradoSeleccionado) return;
    this.apiService.actualizarGrado(this.gradoSeleccionado.id, this.gradoSeleccionado).subscribe({
      next: () => {
        this.mostrarModalEditar = false;
        this.cargarGrados();
      },
      error: (err) => {
        console.error('Error al actualizar grado:', err);
      }
    });
  }

  cerrarModal(tipo: string): void {
    if (tipo === 'detalle') this.mostrarModalDetalle = false;
    else if (tipo === 'crear') this.mostrarModalCrear = false;
    else if (tipo === 'editar') this.mostrarModalEditar = false;
  }
}
