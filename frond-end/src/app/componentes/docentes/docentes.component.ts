import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';
import { Docente } from '../../modelo/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  docentes: Docente[] = [];
  mostrarModal: boolean = false;
  docenteSeleccionado: Docente | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarDocentes();
  }

  cargarDocentes() {
    this.apiService.getDocentes().subscribe({
      next: (data) => {
        console.log('Datos recibidos de docentes:', data);
        this.docentes = data;
      },
      error: (err) => {
        console.error('Error al obtener docentes:', err);
      }
    });
  }

  abrirModalEditar(docente: Docente) {
    this.docenteSeleccionado = JSON.parse(JSON.stringify(docente)); // Clonar objeto para evitar cambios directos
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.docenteSeleccionado = null;
  }

  guardarCambios() {
    if (!this.docenteSeleccionado) return;

    // Preparar objeto simplificado para enviar
    const docenteParaActualizar = {
      id: this.docenteSeleccionado.id,
      persona: {
        ci: this.docenteSeleccionado.persona.ci,
        nombres: this.docenteSeleccionado.persona.nombres,
        apellidos: this.docenteSeleccionado.persona.apellidos,
        genero: this.docenteSeleccionado.persona.genero,
        fecha_nacimiento: this.docenteSeleccionado.persona.fecha_nacimiento,
        direccion: this.docenteSeleccionado.persona.direccion,
        telefono: this.docenteSeleccionado.persona.telefono,
        usuario: {
          id: this.docenteSeleccionado.persona.usuario.id,
          correo: this.docenteSeleccionado.persona.usuario.correo,
          username: this.docenteSeleccionado.persona.usuario.username,
          rol: typeof this.docenteSeleccionado.persona.usuario.rol === 'object' ? this.docenteSeleccionado.persona.usuario.rol.id : this.docenteSeleccionado.persona.usuario.rol
        }
      },
      profesion: this.docenteSeleccionado.profesion,
      fecha_contratacion: this.docenteSeleccionado.fecha_contratacion
    };

    console.log('Objeto docente para actualizar:', docenteParaActualizar);

    this.apiService.actualizarDocente(this.docenteSeleccionado.id, docenteParaActualizar).subscribe({
      next: () => {
        this.cerrarModal();
        this.cargarDocentes();
      },
      error: (err) => {
        console.error('Error al actualizar docente:', err);
      }
    });
  }
}
