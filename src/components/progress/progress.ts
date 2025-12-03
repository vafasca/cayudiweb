import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'pdf' | 'quiz' | 'practice';
  duration: string;
  completed: boolean;
  resourceUrl?: string;
  description?: string;
  hasPreview?: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  lessons: Lesson[];
  isExpanded: boolean;
  hasExam: boolean;
  examEnabled?: boolean;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  overallProgress: number;
  totalModules: number;
  totalLessons: number;
  totalDuration: string;
  enrolledDate: Date;
  lastAccessed: Date;
  description: string;
  modules: Module[];
  showExams: boolean;
  hasCertificate: boolean;
  certificateProgress: number;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class Progress implements OnInit {
course: Course = {
    id: '1',
    title: 'Diplomado en Sonoanatomía',
    instructor: 'Dr. Alejandro Rodríguez',
    instructorAvatar: 'AR',
    category: 'Ultrasonido',
    overallProgress: 65,
    totalModules: 5,
    totalLessons: 24,
    totalDuration: '120 horas',
    enrolledDate: new Date('2024-01-15'),
    lastAccessed: new Date(),
    description: 'Curso completo de sonoanatomía para profesionales de la salud.',
    showExams: true,
    hasCertificate: true,
    certificateProgress: 65,
    modules: [
      {
        id: 'mod-1',
        title: 'Fundamentos de Ultrasonido',
        description: 'Introducción a los principios físicos y equipos de ultrasonido',
        duration: '20 horas',
        progress: 100,
        isExpanded: true,
        hasExam: true,
        examEnabled: true,
        lessons: [
          { id: '1-1', title: 'Introducción al curso', type: 'video', duration: '45 min', completed: true, resourceUrl: 'video-1.mp4', hasPreview: true },
          { id: '1-2', title: 'Principios físicos del ultrasonido', type: 'video', duration: '60 min', completed: true, resourceUrl: 'video-2.mp4' },
          { id: '1-3', title: 'Tipos de transductores', type: 'text', duration: '30 min', completed: true, description: 'Guía completa de transductores' },
          { id: '1-4', title: 'Manual de equipo', type: 'pdf', duration: '45 min', completed: true, resourceUrl: 'manual-equipo.pdf' },
          { id: '1-5', title: 'Evaluación Módulo 1', type: 'quiz', duration: '30 min', completed: true, hasPreview: false }
        ]
      },
      {
        id: 'mod-2',
        title: 'Anatomía Ecográfica Básica',
        description: 'Identificación de estructuras anatómicas normales',
        duration: '30 horas',
        progress: 80,
        isExpanded: false,
        hasExam: true,
        examEnabled: true,
        lessons: [
          { id: '2-1', title: 'Anatomía del abdomen superior', type: 'video', duration: '75 min', completed: true, resourceUrl: 'video-3.mp4' },
          { id: '2-2', title: 'Vasos abdominales', type: 'video', duration: '60 min', completed: true, resourceUrl: 'video-4.mp4' },
          { id: '2-3', title: 'Órganos sólidos', type: 'text', duration: '45 min', completed: true, description: 'Hígado, bazo y páncreas' },
          { id: '2-4', title: 'Atlas anatómico', type: 'pdf', duration: '90 min', completed: false, resourceUrl: 'atlas-anatomia.pdf' },
          { id: '2-5', title: 'Caso clínico: Paciente normal', type: 'practice', duration: '60 min', completed: false, hasPreview: true },
          { id: '2-6', title: 'Evaluación Módulo 2', type: 'quiz', duration: '45 min', completed: false, hasPreview: false }
        ]
      },
      {
        id: 'mod-3',
        title: 'Ecografía Hepática y Biliar',
        description: 'Evaluación completa del sistema hepatobiliar',
        duration: '25 horas',
        progress: 40,
        isExpanded: false,
        hasExam: true,
        examEnabled: true,
        lessons: [
          { id: '3-1', title: 'Anatomía hepática', type: 'video', duration: '50 min', completed: true, resourceUrl: 'video-5.mp4' },
          { id: '3-2', title: 'Técnicas de exploración', type: 'video', duration: '55 min', completed: true, resourceUrl: 'video-6.mp4' },
          { id: '3-3', title: 'Patologías comunes', type: 'text', duration: '40 min', completed: false, description: 'Esteatosis, cirrosis, tumores' },
          { id: '3-4', title: 'Vías biliares', type: 'pdf', duration: '35 min', completed: false, resourceUrl: 'vias-biliares.pdf' },
          { id: '3-5', title: 'Evaluación Módulo 3', type: 'quiz', duration: '40 min', completed: false, hasPreview: false }
        ]
      },
      {
        id: 'mod-4',
        title: 'Ecografía Renal y Urogenital',
        description: 'Estudio de riñones, vejiga y órganos reproductivos',
        duration: '25 horas',
        progress: 0,
        isExpanded: false,
        hasExam: false,
        examEnabled: false,
        lessons: [
          { id: '4-1', title: 'Anatomía renal', type: 'video', duration: '50 min', completed: false, resourceUrl: 'video-7.mp4', hasPreview: true },
          { id: '4-2', title: 'Patología renal', type: 'text', duration: '45 min', completed: false, description: 'Quistes, tumores, hidronefrosis' },
          { id: '4-3', title: 'Vejiga urinaria', type: 'video', duration: '40 min', completed: false, resourceUrl: 'video-8.mp4' },
          { id: '4-4', title: 'Guía de protocolos', type: 'pdf', duration: '60 min', completed: false, resourceUrl: 'protocolos-renal.pdf' }
        ]
      },
      {
        id: 'mod-5',
        title: 'Proyecto Final y Certificación',
        description: 'Integración de conocimientos y evaluación final',
        duration: '20 horas',
        progress: 0,
        isExpanded: false,
        hasExam: true,
        examEnabled: true,
        lessons: [
          { id: '5-1', title: 'Integración de casos', type: 'practice', duration: '120 min', completed: false, description: 'Casos complejos integrados' },
          { id: '5-2', title: 'Preparación para certificación', type: 'text', duration: '90 min', completed: false, description: 'Guía de preparación' },
          { id: '5-3', title: 'Examen final', type: 'quiz', duration: '180 min', completed: false, hasPreview: false },
          { id: '5-4', title: 'Proyecto de investigación', type: 'practice', duration: '240 min', completed: false, description: 'Proyecto aplicado' }
        ]
      }
    ]
  };

  activeLesson: Lesson | null = null;
  showResourcesPanel = false;
  showNotesPanel = false;
  userNote = '';
  notes: string[] = [];
  playbackSpeed = 1.0;
  showSpeedOptions = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.course.modules.length > 0 && this.course.modules[0].lessons.length > 0) {
      this.activeLesson = this.course.modules[0].lessons[0];
    }
  }

  toggleModule(module: Module): void {
    module.isExpanded = !module.isExpanded;
  }

  selectLesson(lesson: Lesson, module: Module): void {
    this.activeLesson = lesson;

    if (!module.isExpanded) {
      module.isExpanded = true;
    }

    if (!lesson.completed && lesson.type !== 'quiz') {
      lesson.completed = true;
      this.updateModuleProgress(module);
      this.updateCourseProgress();
    }
  }

  updateModuleProgress(module: Module): void {
    const completedLessons = module.lessons.filter(lesson => lesson.completed).length;
    module.progress = Math.round((completedLessons / module.lessons.length) * 100);
  }

  updateCourseProgress(): void {
    const totalLessons = this.course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const completedLessons = this.course.modules.reduce((sum, module) => {
      return sum + module.lessons.filter(lesson => lesson.completed).length;
    }, 0);

    this.course.overallProgress = Math.round((completedLessons / totalLessons) * 100);
    this.course.certificateProgress = this.course.overallProgress;
  }

  toggleLessonCompletion(lesson: Lesson, module: Module): void {
    lesson.completed = !lesson.completed;
    this.updateModuleProgress(module);
    this.updateCourseProgress();
  }

  getLessonIcon(type: string): string {
    const icons: {[key: string]: string} = {
      video: '▶',
      text: '📖',
      pdf: '📄',
      quiz: '✓',
      practice: '🔬'
    };
    return icons[type] || '📚';
  }

  getLessonTypeText(type: string): string {
    const types: {[key: string]: string} = {
      video: 'Video',
      text: 'Lectura',
      pdf: 'Documento',
      quiz: 'Evaluación',
      practice: 'Práctica'
    };
    return types[type] || 'Lección';
  }

  getNextLesson(): {module: Module, lesson: Lesson} | null {
    for (let i = 0; i < this.course.modules.length; i++) {
      const module = this.course.modules[i];
      for (let j = 0; j < module.lessons.length; j++) {
        const lesson = module.lessons[j];
        if (!lesson.completed && lesson.id !== this.activeLesson?.id) {
          return {module, lesson};
        }
      }
    }
    return null;
  }

  goToNextLesson(): void {
    const next = this.getNextLesson();
    if (next) {
      this.selectLesson(next.lesson, next.module);
    }
  }

  addNote(): void {
    if (this.userNote.trim()) {
      this.notes.push(`${new Date().toLocaleString()}: ${this.userNote}`);
      this.userNote = '';
    }
  }

  deleteNote(index: number): void {
    this.notes.splice(index, 1);
  }

  toggleResourcesPanel(): void {
    this.showResourcesPanel = !this.showResourcesPanel;
    if (this.showResourcesPanel) {
      this.showNotesPanel = false;
    }
  }

  toggleNotesPanel(): void {
    this.showNotesPanel = !this.showNotesPanel;
    if (this.showNotesPanel) {
      this.showResourcesPanel = false;
    }
  }

  setPlaybackSpeed(speed: number): void {
    this.playbackSpeed = speed;
    this.showSpeedOptions = false;
  }

  downloadResource(lesson: Lesson): void {
    if (lesson.resourceUrl) {
      console.log(`Descargando: ${lesson.resourceUrl}`);
    }
  }

  startExam(module: Module): void {
    if (module.hasExam && module.examEnabled) {
      console.log(`Iniciando examen: ${module.title}`);
    }
  }

  navigateBack(): void {
    this.router.navigate(['/courses']);
  }

  calculateTimeUntilCompletion(): string {
    const remainingLessons = this.course.modules.reduce((sum, module) => {
      return sum + module.lessons.filter(lesson => !lesson.completed).length;
    }, 0);

    const estimatedHours = remainingLessons;

    if (estimatedHours < 1) return 'Menos de 1h';
    if (estimatedHours < 24) return `${estimatedHours}h`;

    const days = Math.ceil(estimatedHours / 24);
    return `${days} día${days > 1 ? 's' : ''}`;
  }
}
