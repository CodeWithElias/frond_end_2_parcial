import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-curso-materias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso-materias.component.html',
  styleUrls: ['./curso-materias.component.css']
})
export class CursoMateriasComponent implements OnInit {
  cursoMaterias: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCursoMaterias().subscribe({
      next: (data) => {
        console.log('Datos recibidos de curso-materias:', data);
        this.cursoMaterias = data;
      },
      error: (err) => {
        console.error('Error al obtener curso-materias:', err);
      }
    });
  }
}
