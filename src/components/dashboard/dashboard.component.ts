import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  nextLesson: string;
  thumbnail: string;
}

interface Activity {
  id: string;
  type: 'task' | 'exam' | 'live-class';
  title: string;
  dueDate: string;
  course: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  showUserMenu = false;
  showNotifications = false;
  showMessages = false;
  notificationCount = 3;
  messageCount = 5;

  weeklyProgress = 68;
  studyTime = '12.5h';
  achievementsUnlocked = 8;

  activeCourses: Course[] = [
    {
      id: '1',
      title: 'Diplomado en Sonoanatomía',
      instructor: 'Dr. Rodríguez',
      progress: 65,
      nextLesson: 'Ecografía Hepática',
      thumbnail: '#4CAF50'
    },
    {
      id: '2',
      title: 'Ecografía Abdominal Avanzada',
      instructor: 'Dra. García',
      progress: 42,
      nextLesson: 'Anatomía Renal',
      thumbnail: '#2196F3'
    },
    {
      id: '3',
      title: 'Ultrasonido en Emergencias',
      instructor: 'Dr. Martínez',
      progress: 28,
      nextLesson: 'FAST Protocol',
      thumbnail: '#FF9800'
    }
  ];

  upcomingActivities: Activity[] = [
    {
      id: '1',
      type: 'task',
      title: 'Caso clínico Módulo 3',
      dueDate: '2 días',
      course: 'Diplomado Sonoanatomía'
    },
    {
      id: '2',
      type: 'exam',
      title: 'Evaluación anatomía',
      dueDate: '3 días',
      course: 'Ecografía Abdominal'
    },
    {
      id: '3',
      type: 'live-class',
      title: 'Clase en vivo',
      dueDate: 'Jueves 15:00 hrs',
      course: 'Ultrasonido Emergencias'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
    this.showMessages = false;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showUserMenu = false;
    this.showMessages = false;
  }

  toggleMessages(): void {
    this.showMessages = !this.showMessages;
    this.showUserMenu = false;
    this.showNotifications = false;
  }

  closeAllMenus(): void {
    this.showUserMenu = false;
    this.showNotifications = false;
    this.showMessages = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string): void {
    this.closeAllMenus();
    
    // Reemplazar console.log por navegación real
    switch(route) {
      case 'dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'courses':
        this.router.navigate(['/courses']); 
        break;
      case 'calendar':
        console.log('Navegando a calendario - componente pendiente');
        break;
      case 'evaluations':
        console.log('Navegando a evaluaciones - componente pendiente');
        break;
      case 'certificates':
        console.log('Navegando a certificados - componente pendiente');
        break;
      case 'progress':
        console.log('Navegando a progreso - componente pendiente');
        break;
      case 'community':
        console.log('Navegando a comunidad - componente pendiente');
        break;
      case 'forums':
        console.log('Navegando a foros - componente pendiente');
        break;
      case 'settings':
        console.log('Navegando a configuración - componente pendiente');
        break;
      case 'profile':
        console.log('Navegando a perfil - componente pendiente');
        break;
      case 'explore':
        console.log('Navegando a explorar cursos - componente pendiente');
        break;
      default:
        console.log('Ruta no configurada:', route);
    }
  }

  continueCourse(courseId: string): void {
    console.log('Continuar curso:', courseId);
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'task': return '📝';
      case 'exam': return '🎯';
      case 'live-class': return '📅';
      default: return '📚';
    }
  }
}
