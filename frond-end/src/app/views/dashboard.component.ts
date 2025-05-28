import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgForOf],
  template: `
    <div class="dashboard-container">
      <h2>Perfil del Estudiante</h2>
      <div class="profile">
        <div class="personal-info">
          <h3>Datos Personales</h3>
          <p><strong>Nombre:</strong> {{ student.name }}</p>
          <p><strong>Edad:</strong> {{ student.age }}</p>
          <p><strong>Grado:</strong> {{ student.grade }}</p>
        </div>
        <div class="subjects">
          <h3>Materias y Notas</h3>
          <table>
            <thead>
              <tr>
                <th>Materia</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let subject of student.subjects">
                <td>{{ subject.name }}</td>
                <td>{{ subject.grade }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 700px;
      margin: 2rem auto;
      padding: 1rem;
      font-family: Arial, sans-serif;
    }
    .profile {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
    }
    .personal-info, .subjects {
      flex: 1;
      background-color: #f4f4f4;
      padding: 1rem;
      border-radius: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 8px 12px;
      border-bottom: 1px solid #ccc;
      text-align: left;
    }
    th {
      background-color: #ddd;
    }
  `]
})
export class DashboardComponent {
  student = {
    name: 'Juan Pérez',
    age: 16,
    grade: '10°',
    subjects: [
      { name: 'Matemáticas', grade: 'A' },
      { name: 'Historia', grade: 'B+' },
      { name: 'Ciencias', grade: 'A-' },
      { name: 'Literatura', grade: 'B' }
    ]
  };
}
