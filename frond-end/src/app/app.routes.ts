import { Routes } from '@angular/router';
import { LoginComponent } from './views/login.component';
import { RegisterComponent } from './views/register.component';
import { DashboardComponent } from './views/dashboard.component';
import { AttendanceComponent } from './views/attendance.component';
import { StudentComponent } from './views/student.component';
import { TeacherComponent } from './views/teacher.component';
import { SubjectComponent } from './views/subject.component';
import { GradeComponent } from './views/grade.component';
import { ReportComponent } from './views/report.component';
import { PredictionComponent } from './views/prediction.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentComponent, canActivate: [AuthGuard] },
  { path: 'teachers', component: TeacherComponent, canActivate: [AuthGuard] },
  { path: 'subjects', component: SubjectComponent, canActivate: [AuthGuard] },
  { path: 'grades', component: GradeComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'predictions', component: PredictionComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
