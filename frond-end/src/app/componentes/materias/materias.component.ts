import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  materias: any[] = [];

  materiaSeleccionada: any = null;
  mostrarModalDetalle: boolean = false;
  mostrarModalCrear: boolean = false;
  mostrarModalEditar: boolean = false;

  nuevaMateria = {
    nombre: '',
    area: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarMaterias();
  }

  cargarMaterias(): void {
    this.apiService.getMaterias().subscribe({
      next: (data) => {
        console.log('Datos recibidos de materias:', data);
        this.materias = data;
      },
      error: (err) => {
        console.error('Error al obtener materias:', err);
      }
    });
  }

  mostrarDetalle(id: number): void {
    this.apiService.getMateriaById(id).subscribe({
      next: (data) => {
        this.materiaSeleccionada = data;
        this.mostrarModalDetalle = true;
      },
      error: (err) => {
        console.error('Error al obtener materia:', err);
      }
    });
  }

  abrirModalCrear(): void {
    this.nuevaMateria = {
      nombre: '',
      area: ''
    };
    this.mostrarModalCrear = true;
  }

  crearMateria(): void {
    this.apiService.crearMateria(this.nuevaMateria).subscribe({
      next: (data) => {
        console.log('Materia creada:', data);
        this.mostrarModalCrear = false;
        this.cargarMaterias();
      },
      error: (err) => {
        console.error('Error al crear materia:', err);
      }
    });
  }

  abrirModalEditar(id: number): void {
    this.apiService.getMateriaById(id).subscribe({
      next: (data) => {
        this.materiaSeleccionada = data;
        this.mostrarModalEditar = true;
      },
      error: (err) => {
        console.error('Error al obtener materia para editar:', err);
      }
    });
  }

  actualizarMateria(): void {
    if (!this.materiaSeleccionada) return;
    this.apiService.actualizarMateria(this.materiaSeleccionada.id, this.materiaSeleccionada).subscribe({
      next: (data) => {
        console.log('Materia actualizada:', data);
        this.mostrarModalEditar = false;
        this.cargarMaterias();
      },
      error: (err) => {
        console.error('Error al actualizar materia:', err);
      }
    });
  }

  cerrarModal(tipo: string): void {
    if (tipo === 'detalle') {
      this.mostrarModalDetalle = false;
      this.materiaSeleccionada = null;
    } else if (tipo === 'crear') {
      this.mostrarModalCrear = false;
    } else if (tipo === 'editar') {
      this.mostrarModalEditar = false;
      this.materiaSeleccionada = null;
    }
  }
}
