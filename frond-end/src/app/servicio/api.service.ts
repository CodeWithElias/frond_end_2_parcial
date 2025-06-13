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
  //private baseUrl = 'https://backendparcial2si2-production.up.railway.app'

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/auth/login/`;
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(url, body, { headers });
  }

  getCursosDocente(docenteId: number): Observable<any[]> {
    const url = `${this.baseUrl}/api/docente/mis-cursos/?docente_id=${docenteId}`;
    return this.http.get<any[]>(url);
  }

  getEstudiantesPorCursoDocente(cursoId: number, docenteId: number): Observable<any[]> {
    const url = `${this.baseUrl}/api/docente/cursos/${cursoId}/estudiantes/?docente_id=${docenteId}`;
    return this.http.get<any[]>(url);
  }

  registrarAsistencia(data: any): Observable<any> {
    const url = `${this.baseUrl}/evaluacion/asistencias/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, data, { headers });
  }

  getAsistencias(): Observable<any[]> {
    const url = `${this.baseUrl}/evaluacion/asistencias/`;
    return this.http.get<any[]>(url);
  }

  registrarCalificacion(data: any): Observable<any> {
    const url = `${this.baseUrl}/evaluacion/calificaciones/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, data, { headers });
  }

  getCalificaciones(): Observable<any[]> {
    const url = `${this.baseUrl}/evaluacion/calificaciones/`;
    return this.http.get<any[]>(url);
  }

  registrarParticipacion(data: any): Observable<any> {
    const url = `${this.baseUrl}/evaluacion/participaciones/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, data, { headers });
  }

  getParticipaciones(): Observable<any[]> {
    const url = `${this.baseUrl}/evaluacion/participaciones/`;
    return this.http.get<any[]>(url);
  }

  registrarPersona(persona: any): Observable<any> {
    const url = `${this.baseUrl}/auth/registrar/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, persona, { headers });
  }

  actualizarEstudiante(id: number, estudiante: any): Observable<any> {
    const url = `${this.baseUrl}/user/estudiantes/${id}/editar/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, estudiante, { headers });
  }

  actualizarDocente(id: number, docente: any): Observable<any> {
    const url = `${this.baseUrl}/user/docentes/${id}/editar/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, docente, { headers });
  }

  actualizarPadre(id: number, padre: any): Observable<any> {
    const url = `${this.baseUrl}/user/padres/${id}/editar/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, padre, { headers });
  }

  getDocentes(): Observable<Docente[]> {
    const url = `${this.baseUrl}/user/docentes/`;
    return this.http.get<Docente[]>(url);
  }

  getEstudiantes(): Observable<Estudiante[]> {
    const url = `${this.baseUrl}/user/estudiantes/`;
    return this.http.get<Estudiante[]>(url);
  }

  getPadres(): Observable<Padre[]> {
    const url = `${this.baseUrl}/user/padres/`;
    return this.http.get<Padre[]>(url);
  }

  getCursos(): Observable<any[]> {
    const url = `${this.baseUrl}/inscripcion/cursos/`;
    return this.http.get<any[]>(url);
  }

  crearCurso(curso: any): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/cursos/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, curso, { headers });
  }

  getPlanillaCurso(cursoId: number, gestionId: number): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/cursos/${cursoId}/planilla/?gestion_id=${gestionId}`;
    return this.http.get<any>(url);
  }

  getEstudiantesPorCurso(cursoId: number, gestionId: number): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/cursos/${cursoId}/estudiantes/?gestion_id=${gestionId}`;
    return this.http.get<any>(url);
  }

  getHorarioCurso(cursoId: number, gestionId: number): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/cursos/${cursoId}/horario/?gestion_id=${gestionId}`;
    return this.http.get<any>(url);
  }

  getInscripciones(): Observable<any[]> {
    const url = `${this.baseUrl}/inscripcion/inscripciones`;
    return this.http.get<any[]>(url);
  }

  crearInscripcion(inscripcion: any): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/inscripciones/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, inscripcion, { headers });
  }

  getInscripcionById(id: number): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/inscripciones/${id}/`;
    return this.http.get<any>(url);
  }

  actualizarInscripcion(id: number, inscripcion: any): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/inscripciones/${id}/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, inscripcion, { headers });
  }

  getMaterias(): Observable<any[]> {
    const url = `${this.baseUrl}/inscripcion/materias`;
    return this.http.get<any[]>(url);
  }

  crearMateria(materia: any): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/materias/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, materia, { headers });
  }

  getMateriaById(id: number): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/materias/${id}/`;
    return this.http.get<any>(url);
  }

  actualizarMateria(id: number, materia: any): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/materias/${id}/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, materia, { headers });
  }

  getCursoMaterias(): Observable<any[]> {
    const url = `${this.baseUrl}/inscripcion/curso-materias`;
    return this.http.get<any[]>(url);
  }

  getHorarios(): Observable<any[]> {
    const url = `${this.baseUrl}/inscripcion/horarios`;
    return this.http.get<any[]>(url);
  }

  crearHorario(horario: any): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/horarios/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, horario, { headers });
  }

  getHorarioById(id: number): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/horarios/${id}/`;
    return this.http.get<any>(url);
  }

  actualizarHorario(id: number, horario: any): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/horarios/${id}/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, horario, { headers });
  }

  eliminarHorario(id: number): Observable<any> {
    const url = `${this.baseUrl}/inscripcion/horarios/${id}/`;
    return this.http.delete<any>(url);
  }

  getNiveles(): Observable<any[]> {
    const url = `${this.baseUrl}/estructura-academica/niveles/`;
    return this.http.get<any[]>(url);
  }

  crearNivel(nivel: any): Observable<any> {
    const url = `${this.baseUrl}/estructura-academica/niveles/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, nivel, { headers });
  }

  getNivelById(id: number): Observable<any> {
    const url = `${this.baseUrl}/estructura-academica/niveles/${id}/`;
    return this.http.get<any>(url);
  }

  actualizarNivel(id: number, nivel: any): Observable<any> {
    const url = `${this.baseUrl}/estructura-academica/niveles/${id}/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, nivel, { headers });
  }

  getGrados(): Observable<any[]> {
    const url = `${this.baseUrl}/estructura-academica/grados`;
    return this.http.get<any[]>(url);
  }

  crearGrado(grado: any): Observable<any> {
    const url = `${this.baseUrl}/estructura-academica/grados/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, grado, { headers });
  }

  getGradoById(id: number): Observable<any> {
    const url = `${this.baseUrl}/estructura-academica/grados/${id}/`;
    return this.http.get<any>(url);
  }

  actualizarGrado(id: number, grado: any): Observable<any> {
    const url = `${this.baseUrl}/estructura-academica/grados/${id}/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, grado, { headers });
  }

  getGestiones(): Observable<any[]> {
    const url = `${this.baseUrl}/estructura-academica/gestiones`;
    return this.http.get<any[]>(url);
  }

  crearGestion(gestion: any): Observable<any> {
    const url = `${this.baseUrl}/estructura-academica/gestiones`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, gestion, { headers });
  }

  actualizarGestion(id: number, gestion: any): Observable<any> {
    const url = `${this.baseUrl}/estructura-academica/gestiones/${id}/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, gestion, { headers });
  }

  getBimestres(): Observable<any[]> {
    const url = `${this.baseUrl}/estructura-academica/bimestres`;
    return this.http.get<any[]>(url);
  }

  crearBimestre(bimestre: any): Observable<any> {
    const url = `${this.baseUrl}/estructura-academica/bimestres`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, bimestre, { headers });
  }

  actualizarBimestre(id: number, bimestre: any): Observable<any> {
    const url = `${this.baseUrl}/estructura-academica/bimestres/${id}/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, bimestre, { headers });
  }

  getBimestresPorAnio(anio: number): Observable<any[]> {
    const url = `${this.baseUrl}/estructura-academica/bimestres-por-anio/${anio}/`;
    return this.http.get<any[]>(url);
  }

  getHijosDePadre(padreId: number): Observable<Estudiante[]> {
    const url = `${this.baseUrl}/api/padre/mis-hijos/?padre_id=${padreId}`;
    return this.http.get<Estudiante[]>(url);
  }

  crearRelacionEstudiantePadre(relacion: any): Observable<any> {
    const url = `${this.baseUrl}/user/relacion-estudiante-padre/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, relacion, { headers });
  }

  getNotasDeHijo(hijoId: number, padreId: number): Observable<any[]> {
    const url = `${this.baseUrl}/api/padre/hijos/${hijoId}/notas/?padre_id=${padreId}`;
    return this.http.get<any[]>(url);
  }

  getNotasEstudiante(estudianteId: number): Observable<any[]> {
    const url = `${this.baseUrl}/api/estudiante/mis-notas/?estudiante_id=${estudianteId}`;
    return this.http.get<any[]>(url);
  }

  getAsistenciaEstudiante(estudianteId: number): Observable<any[]> {
    const url = `${this.baseUrl}/api/estudiante/mi-asistencia/?estudiante_id=${estudianteId}`;
    return this.http.get<any[]>(url);
  }

  getParticipacionEstudiante(estudianteId: number): Observable<any[]> {
    const url = `${this.baseUrl}/api/estudiante/mi-participacion/?estudiante_id=${estudianteId}`;
    return this.http.get<any[]>(url);
  }

  getPrediccionesEstudiante(estudianteId: number): Observable<any> {
  const url = `${this.baseUrl}/api/ia/rendimiento/por_estudiante/?estudiante_id=${estudianteId}`;
  return this.http.get<any>(url);
}
}
