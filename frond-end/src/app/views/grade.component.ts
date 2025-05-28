import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Grade, GradeService } from '../services/grade.service';
import { StudentService, Student } from '../services/student.service';
import { SubjectService, Subject } from '../services/subject.service';

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="grade-container">
      <h2>Gestión de Notas</h2>
      <form (ngSubmit)="addOrUpdateGrade()">
        <select [(ngModel)]="grade.studentId" name="studentId" required>
          <option value="" disabled>Seleccione un alumno</option>
          <option *ngFor="let student of students" [value]="student.id">{{ student.name }}</option>
        </select>
        <select [(ngModel)]="grade.subjectId" name="subjectId" required>
          <option value="" disabled>Seleccione una materia</option>
          <option *ngFor="let subject of subjects" [value]="subject.id">{{ subject.name }}</option>
        </select>
        <input type="number" min="0" max="100" placeholder="Nota" [(ngModel)]="grade.grade" name="grade" required />
        <button type="submit">{{ grade.id ? 'Actualizar' : 'Agregar' }}</button>
        <button type="button" (click)="resetForm()">Cancelar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Materia</th>
            <th>Nota</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let g of grades">
            <td>{{ getStudentName(g.studentId) }}</td>
            <td>{{ getSubjectName(g.subjectId) }}</td>
            <td>{{ g.grade }}</td>
            <td>{{ g.date | date:'shortDate' }}</td>
            <td>
              <button (click)="editGrade(g)">Editar</button>
              <button (click)="deleteGrade(g.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .grade-container {
      max-width: 800px;
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
    select, input {
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
export class GradeComponent {
  grades: Grade[] = [];
  grade: Grade = { id: 0, studentId: 0, subjectId: 0, grade: 0, date: '' };
  students: Student[] = [];
  subjects: Subject[] = [];

  constructor(
    private gradeService: GradeService,
    private studentService: StudentService,
    private subjectService: SubjectService
  ) {
    this.loadGrades();
    this.loadStudents();
    this.loadSubjects();
  }

  loadGrades() {
    this.grades = this.gradeService.getGrades();
  }

  loadStudents() {
    this.students = this.studentService.getStudents();
  }

  loadSubjects() {
    this.subjects = this.subjectService.getSubjects();
  }

  getStudentName(id: number): string {
    const student = this.students.find(s => s.id === id);
    return student ? student.name : 'Desconocido';
  }

  getSubjectName(id: number): string {
    const subject = this.subjects.find(s => s.id === id);
    return subject ? subject.name : 'Desconocido';
  }

  addOrUpdateGrade() {
    if (this.grade.id) {
      this.gradeService.updateGrade(this.grade);
    } else {
      this.grade.id = this.generateId();
      this.grade.date = new Date().toISOString();
      this.gradeService.addGrade(this.grade);
    }
    this.loadGrades();
    this.resetForm();
  }

  editGrade(grade: Grade) {
    this.grade = { ...grade };
  }

  deleteGrade(id: number) {
    this.gradeService.deleteGrade(id);
    this.loadGrades();
  }

  resetForm() {
    this.grade = { id: 0, studentId: 0, subjectId: 0, grade: 0, date: '' };
  }

  private generateId(): number {
    return this.grades.length > 0 ? Math.max(...this.grades.map(g => g.id)) + 1 : 1;
  }
}
