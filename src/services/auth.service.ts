import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  specialty?: string;
  institution?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private rememberSession = false;

  private mockUsers = [
    {
      id: '1',
      email: 'estudiante@cayudi.com',
      password: 'estudiante123',
      name: 'Dr. Juan Pérez',
      role: 'student' as const,
      specialty: 'Médico Cirujano',
      institution: 'Hospital General, Ciudad de México'
    },
    {
      id: '2',
      email: 'instructor@cayudi.com',
      password: 'instructor123',
      name: 'Dra. María Rodríguez',
      role: 'instructor' as const,
      specialty: 'Radiología',
      institution: 'Instituto Nacional de Salud'
    },
    {
      id: '3',
      email: 'admin@cayudi.com',
      password: 'admin123',
      name: 'Administrador',
      role: 'admin' as const
    }
  ];

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string, remember: boolean): { success: boolean; message?: string } {
    const user = this.mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      const { password, ...userWithoutPassword } = user;
      this.rememberSession = remember;

      if (remember) {
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      }

      this.currentUserSubject.next(userWithoutPassword);
      return { success: true };
    }

    return { success: false, message: 'Credenciales incorrectas' };
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  resetPassword(email: string): { success: boolean; message: string } {
    const user = this.mockUsers.find(u => u.email === email);

    if (user) {
      return {
        success: true,
        message: 'Se ha enviado un enlace de recuperación a tu correo electrónico'
      };
    }

    return {
      success: false,
      message: 'No se encontró una cuenta con ese correo electrónico'
    };
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }
}
