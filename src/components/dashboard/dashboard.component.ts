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
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
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
