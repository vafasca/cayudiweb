import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  category: string;
  thumbnail: string;
  status: 'active' | 'completed' | 'pending';
  timeRemaining: string;
  dueDate?: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {
courses: Course[] = [
    {
      id: '1',
      title: 'Diplomado en Sonoanatomía',
      instructor: 'Dr. Rodríguez',
      progress: 65,
      category: 'Ultrasonido',
      thumbnail: '#4CAF50',
      status: 'active',
      timeRemaining: '45h',
      dueDate: '2 días'
    },
    {
      id: '2',
      title: 'Ecografía Abdominal Avanzada',
      instructor: 'Dra. García',
      progress: 100,
      category: 'Diagnóstico',
      thumbnail: '#2196F3',
      status: 'completed',
      timeRemaining: '0h',
      dueDate: 'Completado'
    },
    {
      id: '3',
      title: 'Ultrasonido en Emergencias',
      instructor: 'Dr. Martínez',
      progress: 28,
      category: 'Ultrasonido',
      thumbnail: '#FF9800',
      status: 'active',
      timeRemaining: '60h',
      dueDate: '15 días'
    },
    {
      id: '4',
      title: 'Fundamentos de Ecografía',
      instructor: 'Dr. López',
      progress: 0,
      category: 'Básico',
      thumbnail: '#9C27B0',
      status: 'pending',
      timeRemaining: '30h',
      dueDate: 'Por comenzar'
    },
    {
      id: '5',
      title: 'Ecografía Ginecológica',
      instructor: 'Dra. Sánchez',
      progress: 85,
      category: 'Especializado',
      thumbnail: '#E91E63',
      status: 'active',
      timeRemaining: '15h',
      dueDate: '5 días'
    },
    {
      id: '6',
      title: 'Patologías Hepáticas',
      instructor: 'Dr. Torres',
      progress: 100,
      category: 'Diagnóstico',
      thumbnail: '#3F51B5',
      status: 'completed',
      timeRemaining: '0h',
      dueDate: 'Completado'
    }
  ];

  filteredCourses: Course[] = [];
  activeFilter: string = 'all';
  categoryFilter: string = 'all';
  searchQuery: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredCourses = [...this.courses];
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesStatus = this.activeFilter === 'all' || 
        (this.activeFilter === 'active' && course.progress > 0 && course.progress < 100) ||
        (this.activeFilter === 'completed' && course.progress === 100) ||
        (this.activeFilter === 'pending' && course.progress === 0);
      
      const matchesCategory = this.categoryFilter === 'all' || course.category === this.categoryFilter;
      
      const matchesSearch = this.searchQuery === '' || 
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.filterCourses();
  }

  setCategory(category: string): void {
    this.categoryFilter = category;
    this.filterCourses();
  }

  enterCourse(courseId: string): void {
    console.log('Entrando al curso:', courseId);
    // Esta sería la ruta para el curso detallado
    this.router.navigate([`/course/${courseId}`]);
  }

  exploreCourses(): void {
    this.router.navigate(['/explore']);
  }
}
