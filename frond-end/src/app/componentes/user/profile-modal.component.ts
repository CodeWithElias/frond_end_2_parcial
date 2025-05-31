import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, Usuario } from './autenticacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  usuario: Usuario | null = null;

  constructor(private userService: UserService, private router: Router) {
    this.usuario = this.userService.getUsuario();
  }

  closeModal() {
    this.close.emit();
  }

  onBackgroundClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-background')) {
      this.closeModal();
    }
  }

  logout() {
    // Eliminar datos del usuario del localStorage
    localStorage.clear();
    // Limpiar estado del UserService
    this.userService.setUsuario(undefined as any);
    // Cerrar modal
    this.closeModal();
    // Redirigir a login
    this.router.navigate(['/login']);
  }
}
