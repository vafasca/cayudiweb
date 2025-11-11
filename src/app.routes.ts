import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Courses } from './components/courses/courses';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: Courses },
  { path: '**', redirectTo: '/login' }
];
