import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  materias: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
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
}
