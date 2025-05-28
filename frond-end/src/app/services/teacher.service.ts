import { Injectable } from '@angular/core';

export interface Teacher {
  id: number;
  name: string;
  subject: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private storageKey = 'teachers';

  constructor() {}

  getTeachers(): Teacher[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveTeachers(teachers: Teacher[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(teachers));
  }

  addTeacher(teacher: Teacher): void {
    const teachers = this.getTeachers();
    teachers.push(teacher);
    this.saveTeachers(teachers);

    // Código para consumir API backend (comentado)
    // this.http.post('https://api.example.com/teachers', teacher).subscribe();
  }

  updateTeacher(teacher: Teacher): void {
    const teachers = this.getTeachers();
    const index = teachers.findIndex(t => t.id === teacher.id);
    if (index !== -1) {
      teachers[index] = teacher;
      this.saveTeachers(teachers);

      // Código para consumir API backend (comentado)
      // this.http.put(`https://api.example.com/teachers/${teacher.id}`, teacher).subscribe();
    }
  }

  deleteTeacher(id: number): void {
    let teachers = this.getTeachers();
    teachers = teachers.filter(t => t.id !== id);
    this.saveTeachers(teachers);

    // Código para consumir API backend (comentado)
    // this.http.delete(`https://api.example.com/teachers/${id}`).subscribe();
  }
}
