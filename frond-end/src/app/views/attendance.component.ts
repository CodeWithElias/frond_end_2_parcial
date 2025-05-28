import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../services/attendance.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="attendance-container">
      <h2>Marcar Asistencia</h2>
      <form (ngSubmit)="markAttendance()">
        <label for="subject">Materia:</label>
        <select id="subject" [(ngModel)]="selectedSubject" name="subject" required>
          <option *ngFor="let subject of subjects" [value]="subject">{{ subject }}</option>
        </select>

        <label for="time">Horario:</label>
        <select id="time" [(ngModel)]="selectedTime" name="time" required>
          <option *ngFor="let time of times" [value]="time">{{ time }}</option>
        </select>

        <button type="submit">Marcar Asistencia</button>
      </form>

      <div *ngIf="attendanceMarked" class="confirmation">
        Asistencia marcada para {{ selectedSubject }} en el horario {{ selectedTime }}.
      </div>
      <div *ngIf="errorMessage" class="error">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .attendance-container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 1rem;
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    label {
      font-weight: bold;
    }
    select, button {
      padding: 0.5rem;
      font-size: 1rem;
    }
    button {
      background-color: #2c3e50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #34495e;
    }
    .confirmation {
      margin-top: 1rem;
      color: green;
      font-weight: bold;
    }
    .error {
      margin-top: 1rem;
      color: red;
      font-weight: bold;
    }
  `]
})
export class AttendanceComponent {
  subjects = ['Matemáticas', 'Historia', 'Ciencias', 'Literatura'];
  times = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00'];

  selectedSubject: string = '';
  selectedTime: string = '';
  attendanceMarked = false;
  errorMessage = '';

  constructor(private attendanceService: AttendanceService) {}

  markAttendance() {
    if (this.selectedSubject && this.selectedTime) {
      const record = {
        subject: this.selectedSubject,
        time: this.selectedTime,
        date: new Date().toISOString()
      };
      this.attendanceService.markAttendance(record).subscribe({
        next: () => {
          this.attendanceMarked = true;
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Error al marcar la asistencia. Intente nuevamente.';
          this.attendanceMarked = false;
        }
      });
    }
  }
}
