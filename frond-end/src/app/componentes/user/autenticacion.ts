import { Injectable } from '@angular/core';

export interface Usuario {
  id: number;
  username: string;
  correo: string;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usuario: Usuario | null = null;
  private storageKey = 'usuario';

  setUsuario(usuario: Usuario): void {
    this.usuario = usuario;
    localStorage.setItem(this.storageKey, JSON.stringify(usuario));
  }

  getUsuario(): Usuario | null {
    if (this.usuario) {
      return this.usuario;
    }
    const storedUser = localStorage.getItem(this.storageKey);
    if (storedUser) {
      this.usuario = JSON.parse(storedUser);
      return this.usuario;
    }
    return null;
  }

  clearUsuario(): void {
    this.usuario = null;
    localStorage.removeItem(this.storageKey);
  }
}
