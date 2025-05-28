import { Injectable } from '@angular/core';

export interface Report {
  id: number;
  title: string;
  content: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private storageKey = 'reports';

  constructor() {}

  getReports(): Report[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveReports(reports: Report[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(reports));
  }

  addReport(report: Report): void {
    const reports = this.getReports();
    reports.push(report);
    this.saveReports(reports);

    // Código para consumir API backend (comentado)
    // this.http.post('https://api.example.com/reports', report).subscribe();
  }

  updateReport(report: Report): void {
    const reports = this.getReports();
    const index = reports.findIndex(r => r.id === report.id);
    if (index !== -1) {
      reports[index] = report;
      this.saveReports(reports);

      // Código para consumir API backend (comentado)
      // this.http.put(`https://api.example.com/reports/${report.id}`, report).subscribe();
    }
  }

  deleteReport(id: number): void {
    let reports = this.getReports();
    reports = reports.filter(r => r.id !== id);
    this.saveReports(reports);

    // Código para consumir API backend (comentado)
    // this.http.delete(`https://api.example.com/reports/${id}`).subscribe();
  }
}
