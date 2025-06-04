import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente, Estudiante, Padre } from '../modelo/model';

export interface LoginResponse {
  mensaje: string;
  usuario: {
    id: number;
    username: string;
    correo: string;
    rol: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/auth/login/`;
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(url, body, { headers });
  }

  getDocentes(): Observable<Docente[]> {
    const url = `${this.baseUrl}/user/docentes`;
    return this.http.get<Docente[]>(url);
  }

  getEstudiantes(): Observable<Estudiante[]> {
    const url = `${this.baseUrl}/user/estudiantes`;
    return this.http.get<Estudiante[]>(url);
  }

  getPadres(): Observable<Padre[]> {
    const url = `${this.baseUrl}/user/padres`;
    return this.http.get<Padre[]>(url);
  }

  getCursos(): Observable<any[]> {
    const url = `${this.baseUrl}/inscripcion/cursos`;
    return this.http.get<any[]>(url);
  }

  getInscripciones(): Observable<any[]> {
    const url = `${this.baseUrl}/inscripcion/inscripciones`;
    return this.http.get<any[]>(url);
  }

  getMaterias(): Observable<any[]> {
    const url = `${this.baseUrl}/inscripcion/materias`;
    return this.http.get<any[]>(url);
  }

  getCursoMaterias(): Observable<any[]> {
    const url = `${this.baseUrl}/inscripcion/curso-materias`;
    return this.http.get<any[]>(url);
  }

  getHorarios(): Observable<any[]> {
    const url = `${this.baseUrl}/inscripcion/horarios`;
    return this.http.get<any[]>(url);
  }
}
