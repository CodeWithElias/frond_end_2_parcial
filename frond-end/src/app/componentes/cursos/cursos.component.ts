import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
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
}
