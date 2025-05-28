import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AttendanceRecord {
  subject: string;
  time: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'https://api.example.com/attendance'; // Endpoint genérico

  constructor(private http: HttpClient) {}

  markAttendance(record: AttendanceRecord): Observable<any> {
    return this.http.post(this.apiUrl, record);
  }
}
