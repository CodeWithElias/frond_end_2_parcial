import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
  inscripciones: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getInscripciones().subscribe({
      next: (data) => {
        console.log('Datos recibidos de inscripciones:', data);
        this.inscripciones = data;
      },
      error: (err) => {
        console.error('Error al obtener inscripciones:', err);
      }
    });
  }
}
