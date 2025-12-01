import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }

  canActivateWithRole(allowedRoles: ('student' | 'instructor' | 'admin')[]): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const currentUser = this.authService.currentUserValue;
    if (currentUser && allowedRoles.includes(currentUser.role)) {
      return true;
    }

    // Redirigir según el rol del usuario
    if (currentUser) {
      switch (currentUser.role) {
        case 'student':
          this.router.navigate(['/dashboard']);
          break;
        case 'instructor':
          this.router.navigate(['/instructor-dashboard']);
          break;
        case 'admin':
          this.router.navigate(['/admin-dashboard']);
          break;
      }
    }
    
    return false;
  }
}

// Función para rutas que requieren autenticación básica
export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuardService).canActivate();
};

// Función para rutas que requieren roles específicos
export const roleGuard = (allowedRoles: ('student' | 'instructor' | 'admin')[]): CanActivateFn => {
  return (route, state) => {
    return inject(AuthGuardService).canActivateWithRole(allowedRoles);
  };
};