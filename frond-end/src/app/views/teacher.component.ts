import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Teacher, TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="teacher-container">
      <h2>Gestión de Docentes</h2>
      <form (ngSubmit)="addOrUpdateTeacher()">
        <input type="text" placeholder="Nombre" [(ngModel)]="teacher.name" name="name" required />
        <input type="text" placeholder="Materia" [(ngModel)]="teacher.subject" name="subject" required />
        <button type="submit">{{ teacher.id ? 'Actualizar' : 'Agregar' }}</button>
        <button type="button" (click)="resetForm()">Cancelar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Materia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let t of teachers">
            <td>{{ t.name }}</td>
            <td>{{ t.subject }}</td>
            <td>
              <button (click)="editTeacher(t)">Editar</button>
              <button (click)="deleteTeacher(t.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .teacher-container {
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
export class TeacherComponent {
  teachers: Teacher[] = [];
  teacher: Teacher = { id: 0, name: '', subject: '' };

  constructor(private teacherService: TeacherService) {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teachers = this.teacherService.getTeachers();
  }

  addOrUpdateTeacher() {
    if (this.teacher.id) {
      this.teacherService.updateTeacher(this.teacher);
    } else {
      this.teacher.id = this.generateId();
      this.teacherService.addTeacher(this.teacher);
    }
    this.loadTeachers();
    this.resetForm();
  }

  editTeacher(teacher: Teacher) {
    this.teacher = { ...teacher };
  }

  deleteTeacher(id: number) {
    this.teacherService.deleteTeacher(id);
    this.loadTeachers();
  }

  resetForm() {
    this.teacher = { id: 0, name: '', subject: '' };
  }

  private generateId(): number {
    return this.teachers.length > 0 ? Math.max(...this.teachers.map(t => t.id)) + 1 : 1;
  }
}
