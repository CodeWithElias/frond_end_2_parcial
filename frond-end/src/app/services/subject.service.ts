import { Injectable } from '@angular/core';

export interface Subject {
  id: number;
  name: string;
  teacherId: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private storageKey = 'subjects';

  constructor() {}

  getSubjects(): Subject[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveSubjects(subjects: Subject[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(subjects));
  }

  addSubject(subject: Subject): void {
    const subjects = this.getSubjects();
    subjects.push(subject);
    this.saveSubjects(subjects);

    // Código para consumir API backend (comentado)
    // this.http.post('https://api.example.com/subjects', subject).subscribe();
  }

  updateSubject(subject: Subject): void {
    const subjects = this.getSubjects();
    const index = subjects.findIndex(s => s.id === subject.id);
    if (index !== -1) {
      subjects[index] = subject;
      this.saveSubjects(subjects);

      // Código para consumir API backend (comentado)
      // this.http.put(`https://api.example.com/subjects/${subject.id}`, subject).subscribe();
    }
  }

  deleteSubject(id: number): void {
    let subjects = this.getSubjects();
    subjects = subjects.filter(s => s.id !== id);
    this.saveSubjects(subjects);

    // Código para consumir API backend (comentado)
    // this.http.delete(`https://api.example.com/subjects/${id}`).subscribe();
  }
}
