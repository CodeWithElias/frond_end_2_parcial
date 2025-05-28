import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prediction, PredictionService } from '../services/prediction.service';
import { StudentService, Student } from '../services/student.service';

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prediction-container">
      <h2>Predicciones de Notas</h2>
      <table>
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Nota Predicha</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of predictions">
            <td>{{ getStudentName(p.studentId) }}</td>
            <td>{{ p.predictedGrade }}</td>
            <td>{{ p.date | date:'shortDate' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .prediction-container {
      max-width: 700px;
      margin: 2rem auto;
      padding: 1rem;
      font-family: Arial, sans-serif;
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
export class PredictionComponent {
  predictions: Prediction[] = [];
  students: Student[] = [];

  constructor(private predictionService: PredictionService, private studentService: StudentService) {
    this.loadPredictions();
    this.loadStudents();
  }

  loadPredictions() {
    this.predictions = this.predictionService.getPredictions();
  }

  loadStudents() {
    this.students = this.studentService.getStudents();
  }

  getStudentName(id: number): string {
    const student = this.students.find(s => s.id === id);
    return student ? student.name : 'Desconocido';
  }
}
