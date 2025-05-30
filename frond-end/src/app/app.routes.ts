import { Routes } from '@angular/router';
import { LoginComponent } from './user/login.component';
import { ProfileComponent } from './user/profile.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' }
];
