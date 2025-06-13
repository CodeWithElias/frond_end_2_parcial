import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicio/api.service';
import { Estudiante } from '../../modelo/model';
import { UserService } from '../user/autenticacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hijos',
  templateUrl: './hijos.component.html',
  styleUrls: ['./hijos.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HijosComponent implements OnInit {
  hijos: Estudiante[] = [];
  padreId: number = 0; // Aquí se debe asignar el id del padre autenticado
  selectedHijo: Estudiante | null = null;

  constructor(private apiService: ApiService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const usuario = this.userService.getUsuario();
    if (usuario && usuario.id) {
      this.padreId = usuario.id; // Usar el id del usuario autenticado como padreId
      this.apiService.getHijosDePadre(this.padreId).subscribe(
        (data) => {
          console.log('Datos recibidos de la API:', data);
          this.hijos = data;
        },
        (error) => {
          console.error('Error al obtener los hijos:', error);
        }
      );
    } else {
      console.error('No hay usuario autenticado');
    }
  }


  goToDetalle(hijo: Estudiante): void {
    this.router.navigate(['/hijos', hijo.id], { queryParams: { nombre: hijo.persona.nombres, apellido: hijo.persona.apellidos } });
  }
}
