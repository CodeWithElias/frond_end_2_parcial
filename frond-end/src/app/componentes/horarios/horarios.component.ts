import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  horarios: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getHorarios().subscribe({
      next: (data) => {
        console.log('Datos recibidos de horarios:', data);
        this.horarios = data;
      },
      error: (err) => {
        console.error('Error al obtener horarios:', err);
      }
    });
  }
}
