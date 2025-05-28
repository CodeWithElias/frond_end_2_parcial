import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, SubjectService } from '../services/subject.service';
import { TeacherService, Teacher } from '../services/teacher.service';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="subject-container">
      <h2>Gestión de Materias</h2>
      <form (ngSubmit)="addOrUpdateSubject()">
        <input type="text" placeholder="Nombre de la materia" [(ngModel)]="subject.name" name="name" required />
        <select [(ngModel)]="subject.teacherId" name="teacherId" required>
          <option *ngFor="let teacher of teachers" [value]="teacher.id">{{ teacher.name }}</option>
        </select>
        <button type="submit">{{ subject.id ? 'Actualizar' : 'Agregar' }}</button>
        <button type="button" (click)="resetForm()">Cancelar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Docente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of subjects">
            <td>{{ s.name }}</td>
            <td>{{ getTeacherName(s.teacherId) }}</td>
            <td>
              <button (click)="editSubject(s)">Editar</button>
              <button (click)="deleteSubject(s.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .subject-container {
      max-width: 700px;
      margin: 2rem auto;
      padding: 1rem;
      font-family: Arial, sans-serif;
    }
    form {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      align-items: center;
    }
    input, select {
      flex: 1;
      padding: 0.5rem;
      font-size: 1rem;
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 0.5rem;
      border: 1px solid #ccc;
      text-align: left;
    }
    th {
      background-color: #eee;
    }
  `]
})
export class SubjectComponent {
  subjects: Subject[] = [];
  subject: Subject = { id: 0, name: '', teacherId: 0 };
  teachers: Teacher[] = [];

  constructor(private subjectService: SubjectService, private teacherService: TeacherService) {
    this.loadSubjects();
    this.loadTeachers();
  }

  loadSubjects() {
    this.subjects = this.subjectService.getSubjects();
  }

  loadTeachers() {
    this.teachers = this.teacherService.getTeachers();
  }

  getTeacherName(id: number): string {
    const teacher = this.teachers.find(t => t.id === id);
    return teacher ? teacher.name : 'Desconocido';
  }

  addOrUpdateSubject() {
    if (this.subject.id) {
      this.subjectService.updateSubject(this.subject);
    } else {
      this.subject.id = this.generateId();
      this.subjectService.addSubject(this.subject);
    }
    this.loadSubjects();
    this.resetForm();
  }

  editSubject(subject: Subject) {
    this.subject = { ...subject };
  }

  deleteSubject(id: number) {
    this.subjectService.deleteSubject(id);
    this.loadSubjects();
  }

  resetForm() {
    this.subject = { id: 0, name: '', teacherId: 0 };
  }

  private generateId(): number {
    return this.subjects.length > 0 ? Math.max(...this.subjects.map(s => s.id)) + 1 : 1;
  }
}
