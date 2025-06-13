import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../../modelo/model';

@Component({
  selector: 'app-hijo-detalle',
  templateUrl: './hijo-detalle.component.html',
  styleUrls: ['./hijo-detalle.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HijoDetalleComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.nombre = params['nombre'] || '';
      this.apellido = params['apellido'] || '';
    });
  }
}
