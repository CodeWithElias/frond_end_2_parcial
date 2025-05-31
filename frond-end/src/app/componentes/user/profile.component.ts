import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario, UserService } from './autenticacion';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  usuario: Usuario | null = null;

  constructor(private userService: UserService) {
    this.usuario = this.userService.getUsuario();
  }
}
