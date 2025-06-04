import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private usuarioSubject: BehaviorSubject<Usuario | null>;
  private storageKey = 'usuario';

  constructor() {
    const storedUser = localStorage.getItem(this.storageKey);
    const usuario = storedUser ? JSON.parse(storedUser) : null;
    this.usuarioSubject = new BehaviorSubject<Usuario | null>(usuario);
  }

  setUsuario(usuario: Usuario): void {
    this.usuarioSubject.next(usuario);
    localStorage.setItem(this.storageKey, JSON.stringify(usuario));
  }

  getUsuario(): Usuario | null {
    return this.usuarioSubject.value;
  }

  clearUsuario(): void {
    this.usuarioSubject.next(null);
    localStorage.removeItem(this.storageKey);
  }

  getUsuarioObservable(): Observable<Usuario | null> {
    return this.usuarioSubject.asObservable();
  }
}
