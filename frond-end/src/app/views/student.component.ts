import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student, StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="student-container">
      <h2>Gestión de Alumnos</h2>
      <form (ngSubmit)="addOrUpdateStudent()">
        <input type="text" placeholder="Nombre" [(ngModel)]="student.name" name="name" required />
        <input type="number" placeholder="Edad" [(ngModel)]="student.age" name="age" required />
        <input type="text" placeholder="Grado" [(ngModel)]="student.grade" name="grade" required />
        <button type="submit">{{ student.id ? 'Actualizar' : 'Agregar' }}</button>
        <button type="button" (click)="resetForm()">Cancelar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Grado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of students">
            <td>{{ s.name }}</td>
            <td>{{ s.age }}</td>
            <td>{{ s.grade }}</td>
            <td>
              <button (click)="editStudent(s)">Editar</button>
              <button (click)="deleteStudent(s.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .student-container {
      max-width: 700px;
      margin: 2rem auto;
      padding: 1rem;
      font-family: Arial, sans-serif;
    }
    form {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    input {
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
export class StudentComponent {
  students: Student[] = [];
  student: Student = { id: 0, name: '', age: 0, grade: '' };

  constructor(private studentService: StudentService) {
    this.loadStudents();
  }

  loadStudents() {
    this.students = this.studentService.getStudents();
  }

  addOrUpdateStudent() {
    if (this.student.id) {
      this.studentService.updateStudent(this.student);
    } else {
      this.student.id = this.generateId();
      this.studentService.addStudent(this.student);
    }
    this.loadStudents();
    this.resetForm();
  }

  editStudent(student: Student) {
    this.student = { ...student };
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    this.loadStudents();
  }

  resetForm() {
    this.student = { id: 0, name: '', age: 0, grade: '' };
  }

  private generateId(): number {
    return this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
  }
}
