import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  currentUser: User | null = null;
  showUserMenu = false;
  showNotifications = false;
  showMessages = false;
  notificationCount = 3;
  messageCount = 5;
  activeSection = 'dashboard'; // Sección activa por defecto

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    
    // Escuchar los cambios de ruta para actualizar la sección activa
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.url.split('/')[1] || 'dashboard';
      this.activeSection = url;
    });
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
    this.router.navigate([route]);
  }
}
