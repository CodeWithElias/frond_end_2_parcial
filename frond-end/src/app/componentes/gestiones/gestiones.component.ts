import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicio/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestiones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestiones.component.html',
  styleUrls: ['./gestiones.component.css']
})
export class GestionesComponent implements OnInit {
  gestiones: any[] = [];
  nuevaGestion = {
    id: null,
    anio: null,
    fecha_inicio: '',
    fecha_fin: ''
  };
  gestionSeleccionada: any = null;
  mostrarModalDetalle: boolean = false;
  mostrarModalCrear: boolean = false;
  mostrarModalEditar: boolean = false;
  mensaje: string = '';
  error: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarGestiones();
  }

  cargarGestiones() {
    this.apiService.getGestiones().subscribe({
      next: (data) => {
        this.gestiones = data;
      },
      error: (err) => {
        this.error = 'Error al cargar gestiones: ' + (err.error?.mensaje || err.message || 'Error desconocido');
      }
    });
  }

  mostrarDetalleGestion(id: number): void {
    this.gestionSeleccionada = this.gestiones.find(g => g.id === id) || null;
    this.mostrarModalDetalle = true;
  }

  abrirModalCrear(): void {
    this.nuevaGestion = { id: null, anio: null, fecha_inicio: '', fecha_fin: '' };
    this.mostrarModalCrear = true;
  }

  crearGestion() {
    this.mensaje = '';
    this.error = '';
    this.apiService.crearGestion(this.nuevaGestion).subscribe({
      next: (response) => {
        this.mensaje = 'Gestión creada exitosamente';
        this.nuevaGestion = { id: null, anio: null, fecha_inicio: '', fecha_fin: '' };
        this.mostrarModalCrear = false;
        this.cargarGestiones();
      },
      error: (err) => {
        this.error = 'Error al crear gestión: ' + (err.error?.mensaje || err.message || 'Error desconocido');
      }
    });
  }

  abrirModalEditar(id: number): void {
    this.gestionSeleccionada = this.gestiones.find(g => g.id === id) || null;
    this.mostrarModalEditar = true;
  }

  actualizarGestion(): void {
    if (!this.gestionSeleccionada) return;
    this.apiService.actualizarGestion(this.gestionSeleccionada.id, this.gestionSeleccionada).subscribe({
      next: () => {
        this.mostrarModalEditar = false;
        this.cargarGestiones();
      },
      error: (err) => {
        this.error = 'Error al actualizar gestión: ' + (err.error?.mensaje || err.message || 'Error desconocido');
      }
    });
  }

  cerrarModal(tipo: string): void {
    if (tipo === 'detalle') this.mostrarModalDetalle = false;
    else if (tipo === 'crear') this.mostrarModalCrear = false;
    else if (tipo === 'editar') this.mostrarModalEditar = false;
  }
}
