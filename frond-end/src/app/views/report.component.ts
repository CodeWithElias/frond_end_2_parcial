import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Report, ReportService } from '../services/report.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="report-container">
      <h2>Gestión de Reportes</h2>
      <form (ngSubmit)="addOrUpdateReport()">
        <input type="text" placeholder="Título" [(ngModel)]="report.title" name="title" required />
        <textarea placeholder="Contenido" [(ngModel)]="report.content" name="content" required></textarea>
        <button type="submit">{{ report.id ? 'Actualizar' : 'Agregar' }}</button>
        <button type="button" (click)="resetForm()">Cancelar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Contenido</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let r of reports">
            <td>{{ r.title }}</td>
            <td>{{ r.content }}</td>
            <td>{{ r.date | date:'shortDate' }}</td>
            <td>
              <button (click)="editReport(r)">Editar</button>
              <button (click)="deleteReport(r.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .report-container {
      max-width: 700px;
      margin: 2rem auto;
      padding: 1rem;
      font-family: Arial, sans-serif;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    input, textarea {
      padding: 0.5rem;
      font-size: 1rem;
      width: 100%;
      box-sizing: border-box;
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
      width: fit-content;
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
export class ReportComponent {
  reports: Report[] = [];
  report: Report = { id: 0, title: '', content: '', date: '' };

  constructor(private reportService: ReportService) {
    this.loadReports();
  }

  loadReports() {
    this.reports = this.reportService.getReports();
  }

  addOrUpdateReport() {
    if (this.report.id) {
      this.reportService.updateReport(this.report);
    } else {
      this.report.id = this.generateId();
      this.report.date = new Date().toISOString();
      this.reportService.addReport(this.report);
    }
    this.loadReports();
    this.resetForm();
  }

  editReport(report: Report) {
    this.report = { ...report };
  }

  deleteReport(id: number) {
    this.reportService.deleteReport(id);
    this.loadReports();
  }

  resetForm() {
    this.report = { id: 0, title: '', content: '', date: '' };
  }

  private generateId(): number {
    return this.reports.length > 0 ? Math.max(...this.reports.map(r => r.id)) + 1 : 1;
  }
}
