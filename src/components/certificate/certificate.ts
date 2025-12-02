import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';

interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  courseCategory: string;
  instructor: string;
  studentName: string;
  issueDate: Date;
  certificateId: string;
  status: 'issued' | 'pending' | 'processing';
  pdfUrl?: string;
  isReady: boolean;
  grade?: number;
  hoursCompleted: number;
  validityPeriod?: string;
  isPlaceholder?: boolean;
  placeholderType?: 'pending' | 'processing';
}

@Component({
  selector: 'app-certificate',
  imports: [FormsModule, CommonModule, PdfViewerModule],
  templateUrl: './certificate.html',
  styleUrl: './certificate.css'
})
export class CertificateComponent implements OnInit {
  certificates: Certificate[] = [];
  selectedCertificate: Certificate | null = null;
  currentPdfUrl: string | null = null;  // CAMBIADO: de SafeResourceUrl a string

  activeFilter: 'all' | 'issued' | 'pending' = 'all';
  categoryFilter = 'all';
  searchQuery = '';

  categories = [
    'Ultrasonido',
    'Diagnóstico',
    'Ecografía',
    'Anatomía',
    'Emergencias',
    'Básico',
    'Especializado'
  ];

  constructor() {}  // REMOVIDO: sanitizer ya no es necesario

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates(): void {
    const issuedCertificates: Certificate[] = [
      {
        id: 'cert-001',
        courseId: '1',
        courseTitle: 'Diplomado en Sonoanatomía',
        courseCategory: 'Ultrasonido',
        instructor: 'Dr. Rodríguez',
        studentName: 'Dr. Juan Pérez',
        issueDate: new Date('2024-11-15'),
        certificateId: 'CAY-2024-001234',
        status: 'issued',
        pdfUrl: 'sample-certificate-1.pdf',
        isReady: true,
        grade: 95,
        hoursCompleted: 120,
        validityPeriod: 'Indefinido'
      },
      {
        id: 'cert-002',
        courseId: '2',
        courseTitle: 'Ecografía Abdominal Avanzada',
        courseCategory: 'Diagnóstico',
        instructor: 'Dra. García',
        studentName: 'Dr. Juan Pérez',
        issueDate: new Date('2024-10-20'),
        certificateId: 'CAY-2024-001235',
        status: 'issued',
        pdfUrl: 'sample-certificate-2.pdf',
        isReady: true,
        grade: 88,
        hoursCompleted: 90,
        validityPeriod: 'Indefinido'
      }
    ];

    const pendingCertificates: Certificate[] = [
      {
        id: 'cert-003',
        courseId: '3',
        courseTitle: 'Ultrasonido en Emergencias',
        courseCategory: 'Emergencias',
        instructor: 'Dr. Martínez',
        studentName: 'Dr. Juan Pérez',
        issueDate: new Date(),
        certificateId: 'CAY-2024-001236',
        status: 'pending',
        isReady: false,
        hoursCompleted: 120,
        isPlaceholder: true,
        placeholderType: 'pending',
        validityPeriod: 'Indefinido'
      },
      {
        id: 'cert-004',
        courseId: '4',
        courseTitle: 'Fundamentos de Ecografía',
        courseCategory: 'Básico',
        instructor: 'Dr. López',
        studentName: 'Dr. Juan Pérez',
        issueDate: new Date(),
        certificateId: 'CAY-2024-001237',
        status: 'pending',
        isReady: false,
        hoursCompleted: 60,
        isPlaceholder: true,
        placeholderType: 'pending',
        validityPeriod: 'Indefinido'
      }
    ];

    this.certificates = [...issuedCertificates, ...pendingCertificates];

    if (this.certificates.length > 0) {
      this.selectCertificate(this.certificates[0]);
    }
  }

  get filteredCertificates(): Certificate[] {
    let filtered = this.certificates;

    if (this.activeFilter !== 'all') {
      filtered = filtered.filter(cert => cert.status === this.activeFilter);
    }

    if (this.categoryFilter !== 'all') {
      filtered = filtered.filter(cert => cert.courseCategory === this.categoryFilter);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(cert =>
        cert.courseTitle.toLowerCase().includes(query) ||
        cert.instructor.toLowerCase().includes(query) ||
        cert.certificateId.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  setFilter(filter: 'all' | 'issued' | 'pending'): void {
    this.activeFilter = filter;

    if (this.filteredCertificates.length > 0 && !this.selectedCertificate) {
      const firstCert = this.filteredCertificates[0];
      if (!this.filteredCertificates.some(c => c.id === this.selectedCertificate?.id)) {
        this.selectCertificate(firstCert);
      }
    }
  }

  setCategory(category: string): void {
    this.categoryFilter = category;
  }

  selectCertificate(certificate: Certificate): void {
    this.selectedCertificate = certificate;

    if (certificate.isPlaceholder) {
      this.currentPdfUrl = null;
    } else if (certificate.pdfUrl) {
      // CAMBIADO: URL directa, sin sanitizer
      this.currentPdfUrl = `/assets/certificates/${certificate.pdfUrl}`;
    } else {
      this.currentPdfUrl = null;
    }
  }

  downloadCertificate(certificate: Certificate): void {
    if (certificate.status === 'issued' && certificate.isReady && certificate.pdfUrl) {
      const url = `/assets/certificates/${certificate.pdfUrl}`;
      const link = document.createElement('a');
      link.href = url;
      link.download = `Certificado-${certificate.certificateId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  shareCertificate(certificate: Certificate): void {
    if (certificate.status === 'issued' && certificate.isReady) {
      console.log(`Compartiendo certificado: ${certificate.certificateId}`);
    }
  }

  viewInLinkedIn(certificate: Certificate): void {
    if (certificate.status === 'issued' && certificate.isReady) {
      console.log(`Mostrando en LinkedIn: ${certificate.certificateId}`);
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'issued': return 'Emitido';
      case 'pending': return 'Pendiente';
      case 'processing': return 'En proceso';
      default: return 'Desconocido';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'issued': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'processing': return '#3B82F6';
      default: return '#6B7280';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  canDownload(certificate: Certificate): boolean {
    return certificate.status === 'issued' && certificate.isReady && !certificate.isPlaceholder;
  }

  isPlaceholder(certificate: Certificate): boolean {
    return certificate.isPlaceholder === true;
  }

  getPlaceholderText(certificate: Certificate): string {
    if (certificate.placeholderType === 'pending') {
      return 'Certificado en proceso de emisión';
    }
    return 'Certificado no disponible';
  }

  getPlaceholderIcon(certificate: Certificate): string {
    if (certificate.placeholderType === 'pending') {
      return '⏳';
    }
    return '📄';
  }

  clearFilters(): void {
    this.activeFilter = 'all';
    this.categoryFilter = 'all';
    this.searchQuery = '';
  }

  getStatusCount(status: 'issued' | 'pending'): number {
    return this.certificates.filter(cert => cert.status === status).length;
  }
}
