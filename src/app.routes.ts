import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Courses } from './components/courses/courses';
import { Layout } from './components/layout/layout';
import { authGuard } from './app/guards/auth-guard';
import { Calendar } from './components/calendar/calendar';
import { CertificateComponent } from './components/certificate/certificate';
import { Progress } from './components/progress/progress';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recovery', component: RecoveryComponent },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'courses', component: Courses, canActivate: [authGuard] },
      { path: 'calendar', component: Calendar, canActivate: [authGuard] },
      { path: 'evaluations', component: DashboardComponent },
      { path: 'certificates', component: CertificateComponent },
      { path: 'progress', component: Progress },
      { path: 'community', component: DashboardComponent }, 
      { path: 'forums', component: DashboardComponent },
      { path: 'settings', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
