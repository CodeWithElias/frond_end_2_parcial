import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from './componentes/user/profile-modal.component';
import { Subscription } from 'rxjs';

import { UserService, Usuario } from './componentes/user/autenticacion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ProfileModalComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, OnDestroy {
  public title = 'frond-end';
  public menuOpen = false;
  public profileModalOpen = false;
  public userService = inject(UserService);
  public usuario: Usuario | null = null;
  private usuarioSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.usuarioSubscription = this.userService.getUsuarioObservable().subscribe(usuario => {
      this.usuario = usuario;
      console.log('Usuario actualizado en App:', this.usuario);
    });
  }

  ngOnDestroy(): void {
    this.usuarioSubscription?.unsubscribe();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  openProfileModal() {
    this.profileModalOpen = !this.profileModalOpen;
  }

  closeProfileModal() {
    this.profileModalOpen = false;
  }
}
