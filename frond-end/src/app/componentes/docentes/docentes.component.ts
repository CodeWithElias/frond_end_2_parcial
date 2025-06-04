import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';
import { Docente } from '../../modelo/model';

@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  docentes: Docente[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
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
}
