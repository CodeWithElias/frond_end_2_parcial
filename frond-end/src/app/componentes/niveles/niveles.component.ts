import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-niveles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesComponent implements OnInit {
  niveles: any[] = [];
  mostrarModalDetalle: boolean = false;
  mostrarModalCrear: boolean = false;
  mostrarModalEditar: boolean = false;
  nivelSeleccionado: any = null;
  nuevoNivel: any = {
    nombre: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarNiveles();
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

  mostrarDetalleNivel(id: number): void {
    this.apiService.getNivelById(id).subscribe({
      next: (data) => {
        this.nivelSeleccionado = data;
        this.mostrarModalDetalle = true;
      },
      error: (err) => {
        console.error('Error al obtener detalle de nivel:', err);
      }
    });
  }

  abrirModalCrear(): void {
    this.nuevoNivel = {
      nombre: ''
    };
    this.mostrarModalCrear = true;
  }

  crearNivel(): void {
    this.apiService.crearNivel(this.nuevoNivel).subscribe({
      next: () => {
        this.mostrarModalCrear = false;
        this.cargarNiveles();
      },
      error: (err) => {
        console.error('Error al crear nivel:', err);
      }
    });
  }

  abrirModalEditar(id: number): void {
    this.apiService.getNivelById(id).subscribe({
      next: (data) => {
        this.nivelSeleccionado = data;
        this.mostrarModalEditar = true;
      },
      error: (err) => {
        console.error('Error al obtener nivel para editar:', err);
      }
    });
  }

  actualizarNivel(): void {
    if (!this.nivelSeleccionado) return;
    this.apiService.actualizarNivel(this.nivelSeleccionado.id, this.nivelSeleccionado).subscribe({
      next: () => {
        this.mostrarModalEditar = false;
        this.cargarNiveles();
      },
      error: (err) => {
        console.error('Error al actualizar nivel:', err);
      }
    });
  }

  cerrarModal(tipo: string): void {
    if (tipo === 'detalle') this.mostrarModalDetalle = false;
    else if (tipo === 'crear') this.mostrarModalCrear = false;
    else if (tipo === 'editar') this.mostrarModalEditar = false;
  }
}
