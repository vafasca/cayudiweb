import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Courses } from './components/courses/courses';
import { Layout } from './components/layout/layout';
import { authGuard } from './app/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recovery', component: RecoveryComponent },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'courses', component: Courses },
      { path: 'calendar', component: DashboardComponent }, // Temporal, reemplazar con componente real
      { path: 'evaluations', component: DashboardComponent }, // Temporal
      { path: 'certificates', component: DashboardComponent }, // Temporal
      { path: 'progress', component: DashboardComponent }, // Temporal
      { path: 'community', component: DashboardComponent }, // Temporal
      { path: 'forums', component: DashboardComponent }, // Temporal
      { path: 'settings', component: DashboardComponent }, // Temporal
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
