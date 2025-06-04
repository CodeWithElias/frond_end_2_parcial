import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';
import { Padre } from '../../modelo/model';

@Component({
  selector: 'app-padres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './padres.component.html',
  styleUrls: ['./padres.component.css']
})
export class PadresComponent implements OnInit {
  padres: Padre[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
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
}
