import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-docente',
  templateUrl: './curso-docente.component.html',
  styleUrls: ['./curso-docente.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CursoDocenteComponent implements OnInit {
  cursos: any[] = [];
  docenteId: number = 40; // Puede ser dinámico según autenticación

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getCursosDocente();
  }

  getCursosDocente(): void {
    this.apiService.getCursosDocente(this.docenteId).subscribe({
      next: (data) => {
        this.cursos = data;
        console.log('Cursos del docente:', data);
        data.forEach((curso: any, index: number) => {
          console.log(`Curso[${index}]:`, curso);
        });
      },
      error: (error) => {
        console.error('Error al obtener cursos del docente:', error);
      }
    });
  }

  irAEstudiantes(curso: any): void {
    this.router.navigate(['/estudiantes'], { queryParams: { cursoId: curso.curso, docenteId: this.docenteId, curso: curso.curso, materia: curso.materia } });
  }
}
