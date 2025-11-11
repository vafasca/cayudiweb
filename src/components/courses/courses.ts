import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  progress: number;
  status: 'active' | 'completed' | 'upcoming';
  thumbnail: string;
  timeRemaining: string;
  nextDeadline?: string;
  badge: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {
activeFilter = 'all';
  categoryFilter = 'all';
  searchTerm = '';
  
  categories = [
    'Todos',
    'Ultrasonido',
    'Diagnóstico',
    'Ecografía',
    'Anatomía',
    'Emergencias'
  ];

  courses: Course[] = [
    {
      id: '1',
      title: 'Diplomado en Sonoanatomía',
      instructor: 'Dr. Rodríguez',
      category: 'Ultrasonido',
      progress: 65,
      status: 'active',
      thumbnail: '#4CAF50',
      timeRemaining: '45h restantes',
      nextDeadline: '2 días',
      badge: 'En progreso'
    },
    {
      id: '2',
      title: 'Ecografía Abdominal Avanzada',
      instructor: 'Dra. García',
      category: 'Ecografía',
      progress: 42,
      status: 'active',
      thumbnail: '#2196F3',
      timeRemaining: '28h restantes',
      nextDeadline: '5 días',
      badge: 'En progreso'
    },
    {
      id: '3',
      title: 'Ultrasonido en Emergencias',
      instructor: 'Dr. Martínez',
      category: 'Emergencias',
      progress: 28,
      status: 'active',
      thumbnail: '#FF9800',
      timeRemaining: '52h restantes',
      nextDeadline: '3 días',
      badge: 'En progreso'
    },
    {
      id: '4',
      title: 'Curso de Ecografía Ginecológica',
      instructor: 'Dra. López',
      category: 'Diagnóstico',
      progress: 100,
      status: 'completed',
      thumbnail: '#9C27B0',
      timeRemaining: 'Completado',
      badge: 'Completado'
    },
    {
      id: '5',
      title: 'Fundamentos de Diagnóstico por Imagen',
      instructor: 'Dr. Hernández',
      category: 'Diagnóstico',
      progress: 0,
      status: 'upcoming',
      thumbnail: '#607D8B',
      timeRemaining: '60h total',
      badge: 'Nuevo'
    },
    {
      id: '6',
      title: 'Anatomía Radiológica Avanzada',
      instructor: 'Dra. Morales',
      category: 'Anatomía',
      progress: 15,
      status: 'active',
      thumbnail: '#795548',
      timeRemaining: '38h restantes',
      nextDeadline: '7 días',
      badge: 'En progreso'
    }
  ];

  filteredCourses: Course[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredCourses = this.courses;
  }

  onFilterChange(filter: string): void {
    this.activeFilter = filter;
    this.applyFilters();
  }

  onCategoryChange(category: string): void {
    this.categoryFilter = category;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.courses;

    // Filtro por estado
    if (this.activeFilter !== 'all') {
      filtered = filtered.filter(course => course.status === this.activeFilter);
    }

    // Filtro por categoría
    if (this.categoryFilter !== 'all') {
      filtered = filtered.filter(course => course.category === this.categoryFilter);
    }

    // Filtro por búsqueda
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term)
      );
    }

    this.filteredCourses = filtered;
  }

  enterCourse(courseId: string): void {
    this.router.navigate(['/course', courseId]);
  }

  exploreMoreCourses(): void {
    this.router.navigate(['/explore']);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return '#1E73BE';
      case 'completed': return '#4CAF50';
      case 'upcoming': return '#FF9800';
      default: return '#666666';
    }
  }

  getBadgeColor(badge: string): string {
    switch (badge) {
      case 'En progreso': return '#1E73BE';
      case 'Completado': return '#4CAF50';
      case 'Nuevo': return '#FF9800';
      default: return '#666666';
    }
  }
}
