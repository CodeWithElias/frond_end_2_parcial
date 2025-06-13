import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';
import { Padre } from '../../modelo/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-padres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './padres.component.html',
  styleUrls: ['./padres.component.css']
})
export class PadresComponent implements OnInit {
  padres: Padre[] = [];
  mostrarModal: boolean = false;
  padreSeleccionado: Padre | null = null;

  mostrarModalHijos: boolean = false;
  hijos: any[] = [];

  mostrarModalRelacion: boolean = false;
  estudiantes: any[] = [];
  estudianteSeleccionadoId: number | null = null;
  parentescoSeleccionado: string = 'tutor';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarPadres();
  }

  cargarEstudiantes() {
    this.apiService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
      },
      error: (err) => {
        console.error('Error al obtener estudiantes:', err);
      }
    });
  }

  cargarPadres() {
    this.apiService.getPadres().subscribe({
      next: (data) => {
        console.log('Datos recibidos de padres:', data);
        this.padres = data;
      },
      error: (err) => {
        console.error('Error al obtener padres:', err);
      }
    });
  }

  abrirModalEditar(padre: Padre) {
    this.padreSeleccionado = JSON.parse(JSON.stringify(padre)); // Clonar objeto para evitar cambios directos
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.padreSeleccionado = null;
  }

  guardarCambios() {
    if (!this.padreSeleccionado) return;
    console.log('Objeto padre a actualizar:', this.padreSeleccionado);

    // Preparar objeto simplificado para enviar
    const padreParaActualizar = {
      id: this.padreSeleccionado.id,
      persona: {
        ci: this.padreSeleccionado.persona.ci,
        nombres: this.padreSeleccionado.persona.nombres,
        apellidos: this.padreSeleccionado.persona.apellidos,
        genero: this.padreSeleccionado.persona.genero,
        fecha_nacimiento: this.padreSeleccionado.persona.fecha_nacimiento,
        direccion: this.padreSeleccionado.persona.direccion,
        telefono: this.padreSeleccionado.persona.telefono,
        usuario: {
          id: this.padreSeleccionado.persona.usuario.id,
          correo: this.padreSeleccionado.persona.usuario.correo,
          username: this.padreSeleccionado.persona.usuario.username,
          rol: typeof this.padreSeleccionado.persona.usuario.rol === 'object' ? this.padreSeleccionado.persona.usuario.rol.id : this.padreSeleccionado.persona.usuario.rol
        }
      }
    };

    this.apiService.actualizarPadre(this.padreSeleccionado.id, padreParaActualizar).subscribe({
      next: () => {
        this.cerrarModal();
        this.cargarPadres();
      },
      error: (err) => {
        console.error('Error al actualizar padre:', err);
      }
    });
  }

  abrirModalHijos(padre: Padre) {
    this.apiService.getHijosDePadre(padre.id).subscribe({
      next: (data) => {
        this.hijos = data;
        this.mostrarModalHijos = true;
      },
      error: (err) => {
        console.error('Error al obtener hijos del padre:', err);
      }
    });
  }

  cerrarModalHijos() {
    this.mostrarModalHijos = false;
    this.hijos = [];
  }

  abrirModalRelacion(padre: Padre) {
    this.padreSeleccionado = padre;
    this.estudianteSeleccionadoId = null;
    this.mostrarModalRelacion = true;
    this.cargarEstudiantes();
  }

  cerrarModalRelacion() {
    this.mostrarModalRelacion = false;
    this.estudianteSeleccionadoId = null;
  }

  crearRelacion() {
    if (!this.padreSeleccionado || this.estudianteSeleccionadoId === null) return;

    const relacion = {
      padre: this.padreSeleccionado.id,
      estudiante: this.estudianteSeleccionadoId,
      parentesco: this.parentescoSeleccionado
    };

    console.log('Objeto relación a enviar:', relacion);

    this.apiService.crearRelacionEstudiantePadre(relacion).subscribe({
      next: () => {
        alert('Relación creada exitosamente');
        this.cerrarModalRelacion();
      },
      error: (err) => {
        console.error('Error al crear relación:', err);
        alert('Error al crear relación');
      }
    });
  }
}
