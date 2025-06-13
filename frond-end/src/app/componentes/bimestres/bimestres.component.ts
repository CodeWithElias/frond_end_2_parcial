import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicio/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bimestres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bimestres.component.html',
  styleUrls: ['./bimestres.component.css']
})
export class BimestresComponent implements OnInit {
  bimestres: any[] = [];
  nuevoBimestre = {
    id: null,
    nombre: '',
    fecha_inicio: '',
    fecha_fin: ''
  };
  bimestreSeleccionado: any = null;
  mostrarModalDetalle: boolean = false;
  mostrarModalCrear: boolean = false;
  mostrarModalEditar: boolean = false;
  mostrarModalPorAnio: boolean = false;
  anioSeleccionado: number | null = null;
  bimestresPorAnio: any[] = [];
  mensaje: string = '';
  error: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarBimestres();
  }

  cargarBimestres() {
    this.apiService.getBimestres().subscribe({
      next: (data) => {
        this.bimestres = data;
      },
      error: (err) => {
        this.error = 'Error al cargar bimestres: ' + (err.error?.mensaje || err.message || 'Error desconocido');
      }
    });
  }

  mostrarDetalleBimestre(id: number): void {
    this.bimestreSeleccionado = this.bimestres.find(b => b.id === id) || null;
    this.mostrarModalDetalle = true;
  }

  abrirModalCrear(): void {
    this.nuevoBimestre = { id: null, nombre: '', fecha_inicio: '', fecha_fin: '' };
    this.mostrarModalCrear = true;
  }

  crearBimestre() {
    this.mensaje = '';
    this.error = '';
    this.apiService.crearBimestre(this.nuevoBimestre).subscribe({
      next: (response) => {
        this.mensaje = 'Bimestre creado exitosamente';
        this.nuevoBimestre = { id: null, nombre: '', fecha_inicio: '', fecha_fin: '' };
        this.mostrarModalCrear = false;
        this.cargarBimestres();
      },
      error: (err) => {
        this.error = 'Error al crear bimestre: ' + (err.error?.mensaje || err.message || 'Error desconocido');
      }
    });
  }

  abrirModalEditar(id: number): void {
    this.bimestreSeleccionado = this.bimestres.find(b => b.id === id) || null;
    this.mostrarModalEditar = true;
  }

  actualizarBimestre(): void {
    if (!this.bimestreSeleccionado) return;
    this.apiService.actualizarBimestre(this.bimestreSeleccionado.id, this.bimestreSeleccionado).subscribe({
      next: () => {
        this.mostrarModalEditar = false;
        this.cargarBimestres();
      },
      error: (err) => {
        this.error = 'Error al actualizar bimestre: ' + (err.error?.mensaje || err.message || 'Error desconocido');
      }
    });
  }

  abrirModalPorAnio(): void {
    this.anioSeleccionado = null;
    this.bimestresPorAnio = [];
    this.mostrarModalPorAnio = true;
  }

  cargarBimestresPorAnio(): void {
    if (this.anioSeleccionado === null) {
      this.error = 'Por favor ingrese un año válido.';
      return;
    }
    this.error = '';
    this.apiService.getBimestresPorAnio(this.anioSeleccionado).subscribe({
      next: (data) => {
        this.bimestresPorAnio = data;
      },
      error: (err) => {
        this.error = 'Error al cargar bimestres por año: ' + (err.error?.mensaje || err.message || 'Error desconocido');
      }
    });
  }

  cerrarModal(tipo: string): void {
    if (tipo === 'detalle') this.mostrarModalDetalle = false;
    else if (tipo === 'crear') this.mostrarModalCrear = false;
    else if (tipo === 'editar') this.mostrarModalEditar = false;
    else if (tipo === 'porAnio') this.mostrarModalPorAnio = false;
  }
}
