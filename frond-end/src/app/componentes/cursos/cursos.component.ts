import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: any[] = [];
  nuevoCurso = {
    paralelo: '',
    grado: '',
    gestion: ''
  };

  planillaData: any[] = [];
  estudiantesData: any | null = null;
  horarioData: any | null = null;

  mostrarModalPlanilla: boolean = false;
  mostrarModalEstudiantes: boolean = false;
  mostrarModalHorario: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.apiService.getCursos().subscribe({
      next: (data) => {
        console.log('Datos recibidos de cursos:', data);
        this.cursos = data;
      },
      error: (err) => {
        console.error('Error al obtener cursos:', err);
      }
    });
  }

  crearCurso(): void {
    this.apiService.crearCurso(this.nuevoCurso).subscribe({
      next: (data) => {
        console.log('Curso creado:', data);
        this.nuevoCurso = { paralelo: '', grado: '', gestion: '' };
        this.cargarCursos();
      },
      error: (err) => {
        console.error('Error al crear curso:', err);
      }
    });
  }

  mostrarPlanilla(curso: any): void {
    const gestionId = curso.gestion.id || curso.gestion; // handle if gestion is object or id
    this.apiService.getPlanillaCurso(curso.id, gestionId).subscribe({
      next: (data) => {
        this.planillaData = data;
        this.mostrarModalPlanilla = true;
      },
      error: (err) => {
        console.error('Error al obtener planilla:', err);
      }
    });
  }

  mostrarEstudiantes(curso: any): void {
    const gestionId = curso.gestion.id || curso.gestion;
    this.apiService.getEstudiantesPorCurso(curso.id, gestionId).subscribe({
      next: (data) => {
        this.estudiantesData = data;
        this.mostrarModalEstudiantes = true;
      },
      error: (err) => {
        console.error('Error al obtener estudiantes:', err);
      }
    });
  }

  mostrarHorario(curso: any): void {
    const gestionId = curso.gestion.id || curso.gestion;
    this.apiService.getHorarioCurso(curso.id, gestionId).subscribe({
      next: (data) => {
        this.horarioData = data;
        this.mostrarModalHorario = true;
      },
      error: (err) => {
        console.error('Error al obtener horario:', err);
      }
    });
  }

  cerrarModal(tipo: string): void {
    if (tipo === 'planilla') {
      this.mostrarModalPlanilla = false;
      this.planillaData = [];
    } else if (tipo === 'estudiantes') {
      this.mostrarModalEstudiantes = false;
      this.estudiantesData = null;
    } else if (tipo === 'horario') {
      this.mostrarModalHorario = false;
      this.horarioData = null;
    }
  }
}
