import { Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare global {
  interface Window { onYouTubeIframeAPIReady: any; YT: any; }
}

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

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'image' | 'video' | 'link';
  description: string;
  size: string;
  downloadUrl?: string;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class Progress implements OnInit, OnDestroy {
@ViewChild('html5Video') html5VideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('ytPlayerContainer') ytPlayerContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('videoScreen') videoScreen!: ElementRef<HTMLDivElement>;

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
          { id: '1-1', title: 'Introducción al curso', type: 'video', duration: '45 min', completed: true, resourceUrl: 'M7lc1UVf-VE', hasPreview: true },
          { id: '1-2', title: 'Principios físicos del ultrasonido', type: 'video', duration: '60 min', completed: true, resourceUrl: 'dQw4w9WgXcQ' },
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
  notes: string[] = [
    '2024-03-15 10:30: Importante: Recordar la relación entre el tamaño del transductor y la frecuencia',
    '2024-03-16 14:45: Los vasos abdominales se visualizan mejor en posición decúbito supino',
    '2024-03-17 09:20: Practicar más las técnicas de exploración hepática'
  ];
  playbackSpeed = 1.0;
  showSpeedOptions = false;
  showVideoOverlay = true;

  resources: Resource[] = [
    { id: '1', title: 'Guía Completa de Ultrasonido', type: 'pdf', description: 'Manual detallado de técnicas y procedimientos', size: '45 páginas', downloadUrl: 'assets/guia-ultrasonido.pdf' },
    { id: '2', title: 'Atlas Anatómico Interactivo', type: 'image', description: 'Imágenes en alta resolución de anatomía normal', size: '120 imágenes', downloadUrl: 'assets/atlas-anatomico.zip' },
    { id: '3', title: 'Técnicas Avanzadas de Exploración', type: 'video', description: 'Video demostrativo de técnicas especializadas', size: '25 min', downloadUrl: 'assets/tecnicas-avanzadas.mp4' },
    { id: '4', title: 'Protocolos de Exploración', type: 'pdf', description: 'Protocolos estandarizados para cada órgano', size: '30 páginas', downloadUrl: 'assets/protocolos.pdf' },
    { id: '5', title: 'Casos Clínicos Resueltos', type: 'pdf', description: 'Colección de casos diagnósticos con soluciones', size: '60 páginas', downloadUrl: 'assets/casos-clinicos.pdf' }
  ];

  // player state
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 100;
  muted = false;

  // internal
  private updateTimer: any = null;
  private ytPlayer: any = null;
  private ytApiReady = false;
  private ytApiPromiseResolve: (() => void) | null = null;
  private ytApiPromise: Promise<void> | null = null;

  constructor(private router: Router, private zone: NgZone) {}

  ngOnInit(): void {
    if (this.course.modules.length > 0 && this.course.modules[0].lessons.length > 0) {
      this.activeLesson = this.course.modules[0].lessons[0];
      this.updateAllProgress();
    }
    this.prepareYouTubeApi();
    setTimeout(() => this.initPlayerForActiveLesson(), 200);
  }

  ngOnDestroy(): void {
    this.clearUpdateTimer();
    this.destroyYouTubePlayer();
  }

  private updateAllProgress(): void {
    this.course.modules.forEach(module => this.updateModuleProgress(module));
    this.updateCourseProgress();
  }

  /*************** Player init logic ***************/
  private prepareYouTubeApi() {
    if (this.ytApiPromise) return;
    this.ytApiPromise = new Promise<void>((resolve) => {
      this.ytApiPromiseResolve = resolve;
      if (window.YT && window.YT.Player) {
        this.ytApiReady = true;
        resolve();
        return;
      }
      const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existing) {
        const s = document.createElement('script');
        s.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(s);
      }
      window.onYouTubeIframeAPIReady = () => {
        this.ytApiReady = true;
        if (this.ytApiPromiseResolve) this.ytApiPromiseResolve();
      };
    });
  }

  private destroyYouTubePlayer() {
    try {
      if (this.ytPlayer && typeof this.ytPlayer.destroy === 'function') {
        this.ytPlayer.destroy();
      }
    } catch (e) { /* ignore */ }
    this.ytPlayer = null;
  }

  private initPlayerForActiveLesson() {
    this.clearUpdateTimer();
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.muted = false;
    this.showVideoOverlay = true;

    if (!this.activeLesson || this.activeLesson.type !== 'video') {
      this.destroyYouTubePlayer();
      return;
    }

    const url = this.activeLesson.resourceUrl || '';
    if (this.isMp4(url)) {
      this.destroyYouTubePlayer();
      setTimeout(() => this.initHtml5Player(url), 100);
    } else {
      const videoId = this.extractYouTubeId(url);
      if (!videoId) {
        this.destroyYouTubePlayer();
        return;
      }
      this.initYouTubePlayer(videoId);
    }
  }

  private isMp4(url?: string): boolean {
    if (!url) return false;
    return url.toLowerCase().endsWith('.mp4') || 
           url.toLowerCase().endsWith('.webm') || 
           url.toLowerCase().endsWith('.ogg');
  }

  private extractYouTubeId(urlOrId: string): string | null {
    if (!urlOrId) return null;
    if (/^[A-Za-z0-9_-]{11}$/.test(urlOrId)) return urlOrId;
    const ytMatch = urlOrId.match(/[?&]v=([^&]+)/);
    if (ytMatch && ytMatch[1]) return ytMatch[1];
    const shortMatch = urlOrId.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch && shortMatch[1]) return shortMatch[1];
    return null;
  }

  private initHtml5Player(src: string) {
    const vid = this.html5VideoRef?.nativeElement;
    if (!vid) return;
    vid.src = src;
    vid.playbackRate = this.playbackSpeed;
    vid.volume = this.volume / 100;
    vid.currentTime = 0;
    vid.pause();
    this.duration = isFinite(vid.duration) ? vid.duration : 0;

    vid.onloadedmetadata = () => {
      this.duration = vid.duration || 0;
      this.zone.run(() => {});
    };
    vid.ontimeupdate = () => {
      this.zone.run(() => {
        this.currentTime = vid.currentTime || 0;
      });
    };
    vid.onplay = () => this.zone.run(() => {
      this.isPlaying = true;
      this.showVideoOverlay = false;
    });
    vid.onpause = () => this.zone.run(() => {
      this.isPlaying = false;
      this.showVideoOverlay = true;
    });
    vid.onended = () => this.zone.run(() => {
      this.isPlaying = false;
      this.showVideoOverlay = true;
      this.markLessonAsCompleted();
    });

    this.startUpdateTimer();
  }

  private async initYouTubePlayer(videoId: string) {
    await (this.ytApiPromise || Promise.resolve());
    this.destroyYouTubePlayer();

    const container = this.ytPlayerContainer?.nativeElement;
    if (!container) return;
    container.innerHTML = '';
    this.ytPlayer = new window.YT.Player(container, {
      videoId,
      playerVars: {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
        disablekb: 0,
      },
      events: {
        onReady: (e: any) => {
          this.zone.run(() => {
            try {
              this.duration = e.target.getDuration() || 0;
              this.volume = e.target.getVolume() || 100;
              this.muted = e.target.isMuted();
              this.playbackSpeed = e.target.getPlaybackRate ? e.target.getPlaybackRate() : this.playbackSpeed;
            } catch(e) {}
            this.startUpdateTimer();
          });
        },
        onStateChange: (ev: any) => {
          this.zone.run(() => {
            const s = window.YT.PlayerState;
            if (ev.data === s.PLAYING) {
              this.isPlaying = true;
              this.showVideoOverlay = false;
            } else if (ev.data === s.PAUSED) {
              this.isPlaying = false;
              this.showVideoOverlay = true;
            } else if (ev.data === s.ENDED) {
              this.isPlaying = false;
              this.showVideoOverlay = true;
              this.markLessonAsCompleted();
            }
          });
        }
      }
    });
  }

  private markLessonAsCompleted(): void {
    if (this.activeLesson && !this.activeLesson.completed && this.activeLesson.type === 'video') {
      this.activeLesson.completed = true;
      const module = this.findModuleContainingLesson(this.activeLesson.id);
      if (module) {
        this.updateModuleProgress(module);
        this.updateCourseProgress();
      }
    }
  }

  private findModuleContainingLesson(lessonId: string): Module | null {
    for (const module of this.course.modules) {
      if (module.lessons.some(l => l.id === lessonId)) return module;
    }
    return null;
  }

  private startUpdateTimer() {
    this.clearUpdateTimer();
    this.updateTimer = setInterval(() => this.updatePlayerState(), 250);
  }

  private clearUpdateTimer() {
    if (this.updateTimer) { 
      clearInterval(this.updateTimer); 
      this.updateTimer = null; 
    }
  }

  private updatePlayerState() {
    if (!this.activeLesson || this.activeLesson.type !== 'video') return;
    
    if (this.isMp4(this.activeLesson.resourceUrl || '') && this.html5VideoRef?.nativeElement) {
      const vid = this.html5VideoRef.nativeElement;
      this.zone.run(() => {
        this.currentTime = vid.currentTime || 0;
        this.duration = vid.duration || 0;
        this.isPlaying = !vid.paused && !vid.ended;
      });
    } else if (this.ytPlayer && typeof this.ytPlayer.getCurrentTime === 'function') {
      try {
        const cur = this.ytPlayer.getCurrentTime();
        const dur = this.ytPlayer.getDuration();
        this.zone.run(() => {
          this.currentTime = cur || 0;
          this.duration = dur || 0;
        });
      } catch(e) {}
    }
  }

  /*************** Controls ***************/
  playPause(): void {
    if (!this.activeLesson) return;
    
    if (this.isMp4(this.activeLesson.resourceUrl || '') && this.html5VideoRef?.nativeElement) {
      const vid = this.html5VideoRef.nativeElement;
      if (vid.paused) {
        vid.play();
        this.showVideoOverlay = false;
      } else {
        vid.pause();
        this.showVideoOverlay = true;
      }
      return;
    }
    
    if (this.ytPlayer) {
      const state = this.ytPlayer.getPlayerState();
      const playing = state === window.YT.PlayerState.PLAYING;
      if (playing) {
        this.ytPlayer.pauseVideo();
        this.showVideoOverlay = true;
      } else {
        this.ytPlayer.playVideo();
        this.showVideoOverlay = false;
      }
    }
  }

  seekTo(seconds: number) {
    if (!this.activeLesson) return;
    
    if (this.isMp4(this.activeLesson.resourceUrl || '') && this.html5VideoRef?.nativeElement) {
      const vid = this.html5VideoRef.nativeElement;
      vid.currentTime = Math.max(0, Math.min((vid.duration || 0), seconds));
    } else if (this.ytPlayer && typeof this.ytPlayer.seekTo === 'function') {
      this.ytPlayer.seekTo(Math.max(0, Math.min((this.ytPlayer.getDuration() || 0), seconds)), true);
    }
    this.updatePlayerState();
  }

  seekBy(offset: number) {
    this.seekTo((this.currentTime || 0) + offset);
  }

  onSeekBarInput(e: Event) {
    const val = +(e.target as HTMLInputElement).value;
    this.currentTime = val;
  }

  onSeekBarChange(e: Event) {
    const val = +(e.target as HTMLInputElement).value;
    this.seekTo(val);
  }

  setPlaybackSpeed(speed: number) {
    this.playbackSpeed = speed;
    if (this.isMp4(this.activeLesson?.resourceUrl || '') && this.html5VideoRef?.nativeElement) {
      this.html5VideoRef.nativeElement.playbackRate = speed;
    } else if (this.ytPlayer && typeof this.ytPlayer.setPlaybackRate === 'function') {
      try { this.ytPlayer.setPlaybackRate(speed); } catch(e) {}
    }
    this.showSpeedOptions = false;
  }

  setVolume(v: number) {
    this.volume = v;
    if (this.isMp4(this.activeLesson?.resourceUrl || '') && this.html5VideoRef?.nativeElement) {
      this.html5VideoRef.nativeElement.volume = v / 100;
      this.muted = this.html5VideoRef.nativeElement.volume === 0;
    } else if (this.ytPlayer && typeof this.ytPlayer.setVolume === 'function') {
      try { this.ytPlayer.setVolume(v); this.muted = this.ytPlayer.isMuted(); } catch(e) {}
    }
  }

  toggleMute() {
    if (this.isMp4(this.activeLesson?.resourceUrl || '') && this.html5VideoRef?.nativeElement) {
      const vid = this.html5VideoRef.nativeElement;
      if (this.muted) { 
        vid.muted = false; 
        this.muted = false; 
        this.volume = vid.volume * 100; 
      } else { 
        vid.muted = true; 
        this.muted = true; 
        this.volume = 0; 
      }
    } else if (this.ytPlayer) {
      if (this.muted) { 
        this.ytPlayer.unMute(); 
        this.muted = false; 
        this.volume = this.ytPlayer.getVolume(); 
      } else { 
        this.ytPlayer.mute(); 
        this.muted = true; 
        this.volume = 0; 
      }
    }
  }

  toggleFullscreen() {
    const el = this.videoScreen?.nativeElement;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  }

  formatTimeLabel(sec: number): string {
    if (!isFinite(sec) || sec <= 0) return '0:00';
    const s = Math.floor(sec);
    const m = Math.floor(s / 60);
    const ss = (s % 60).toString().padStart(2, '0');
    return `${m}:${ss}`;
  }

  /*************** Course functionality ***************/
  toggleModule(module: Module): void {
    module.isExpanded = !module.isExpanded;
  }

  selectLesson(lesson: Lesson, module: Module): void {
    this.activeLesson = lesson;
    if (!module.isExpanded) module.isExpanded = true;

    setTimeout(() => this.initPlayerForActiveLesson(), 150);
  }

  updateModuleProgress(module: Module): void {
    const completedLessons = module.lessons.filter(lesson => lesson.completed).length;
    const totalLessons = module.lessons.length;
    module.progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  }

  updateCourseProgress(): void {
    const totalLessons = this.course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const completedLessons = this.course.modules.reduce((sum, module) => {
      return sum + module.lessons.filter(lesson => lesson.completed).length;
    }, 0);

    this.course.overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
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
      const timestamp = new Date().toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      this.notes.unshift(`${timestamp}: ${this.userNote.trim()}`);
      this.userNote = '';
    }
  }

  deleteNote(index: number): void {
    this.notes.splice(index, 1);
  }

  toggleResourcesPanel(): void {
    this.showResourcesPanel = !this.showResourcesPanel;
    if (this.showResourcesPanel) this.showNotesPanel = false;
  }

  toggleNotesPanel(): void {
    this.showNotesPanel = !this.showNotesPanel;
    if (this.showNotesPanel) this.showResourcesPanel = false;
  }

  downloadResource(resource: Resource): void {
    if (resource.downloadUrl) {
      console.log(`Descargando: ${resource.title} desde ${resource.downloadUrl}`);
      window.open(resource.downloadUrl, '_blank');
    }
  }

  viewResource(resource: Resource): void {
    console.log(`Viendo: ${resource.title}`);
    if (resource.type === 'video') {
      window.open(resource.downloadUrl, '_blank');
    } else if (resource.type === 'pdf') {
      window.open(resource.downloadUrl, '_blank');
    }
  }

  startExam(module: Module): void {
    if (module.hasExam && module.examEnabled) {
      console.log(`Iniciando examen: ${module.title}`);
      alert(`Iniciando examen del módulo: ${module.title}`);
    }
  }

  navigateBack(): void {
    this.router.navigate(['/courses']);
  }

  calculateTimeUntilCompletion(): string {
    const remainingLessons = this.course.modules.reduce((sum, module) => {
      return sum + module.lessons.filter(lesson => !lesson.completed).length;
    }, 0);

    const estimatedHours = remainingLessons * 2;

    if (estimatedHours < 1) return 'Menos de 1h';
    if (estimatedHours < 24) return `${estimatedHours}h`;

    const days = Math.ceil(estimatedHours / 24);
    return `${days} día${days > 1 ? 's' : ''}`;
  }

  downloadLesson(lesson: Lesson): void {
  if (lesson.resourceUrl) {
    console.log(`Descargando lección: ${lesson.title} - ${lesson.resourceUrl}`);
    // Simular descarga
    const link = document.createElement('a');
    link.href = lesson.resourceUrl;
    link.download = lesson.title + (lesson.type === 'pdf' ? '.pdf' : '');
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // También marcar como completada si no lo está
    if (!lesson.completed && lesson.type === 'pdf') {
      lesson.completed = true;
      const module = this.findModuleContainingLesson(lesson.id);
      if (module) {
        this.updateModuleProgress(module);
        this.updateCourseProgress();
      }
    }
  }
}
}
