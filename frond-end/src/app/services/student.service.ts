import { Injectable } from '@angular/core';

export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private storageKey = 'students';

  constructor() {}

  // Método para obtener todos los estudiantes
  getStudents(): Student[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Método para guardar la lista de estudiantes
  private saveStudents(students: Student[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(students));
  }

  // Método para agregar un nuevo estudiante
  addStudent(student: Student): void {
    const students = this.getStudents();
    students.push(student);
    this.saveStudents(students);

    // Código para consumir API backend (comentado)
    // this.http.post('https://api.example.com/students', student).subscribe();
  }

  // Método para actualizar un estudiante existente
  updateStudent(student: Student): void {
    const students = this.getStudents();
    const index = students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      students[index] = student;
      this.saveStudents(students);

      // Código para consumir API backend (comentado)
      // this.http.put(`https://api.example.com/students/${student.id}`, student).subscribe();
    }
  }

  // Método para eliminar un estudiante
  deleteStudent(id: number): void {
    let students = this.getStudents();
    students = students.filter(s => s.id !== id);
    this.saveStudents(students);

    // Código para consumir API backend (comentado)
    // this.http.delete(`https://api.example.com/students/${id}`).subscribe();
  }
}
