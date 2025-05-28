import { Injectable } from '@angular/core';

export interface Grade {
  id: number;
  studentId: number;
  subjectId: number;
  grade: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private storageKey = 'grades';

  constructor() {}

  getGrades(): Grade[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveGrades(grades: Grade[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(grades));
  }

  addGrade(grade: Grade): void {
    const grades = this.getGrades();
    grades.push(grade);
    this.saveGrades(grades);

    // Código para consumir API backend (comentado)
    // this.http.post('https://api.example.com/grades', grade).subscribe();
  }

  updateGrade(grade: Grade): void {
    const grades = this.getGrades();
    const index = grades.findIndex(g => g.id === grade.id);
    if (index !== -1) {
      grades[index] = grade;
      this.saveGrades(grades);

      // Código para consumir API backend (comentado)
      // this.http.put(`https://api.example.com/grades/${grade.id}`, grade).subscribe();
    }
  }

  deleteGrade(id: number): void {
    let grades = this.getGrades();
    grades = grades.filter(g => g.id !== id);
    this.saveGrades(grades);

    // Código para consumir API backend (comentado)
    // this.http.delete(`https://api.example.com/grades/${id}`).subscribe();
  }
}
