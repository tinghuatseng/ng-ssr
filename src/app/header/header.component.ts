import { Component, ChangeDetectionStrategy, signal, HostListener } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

interface NavLink {
  text: string;
  url: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, UserAvatarComponent, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class HeaderComponent {
  isLoggedIn = signal(false); // Mock data, replace with real auth state
  user = signal({ name: 'Annie', avatarUrl: 'https://i.pravatar.cc/40' }); // Mock user data
  isMenuOpen = signal(false);
  isScrolled = signal(false);

  navLinks = signal<NavLink[]>([
    { text: 'Food Search', url: '/food-search' },
    { text: 'About Us', url: '/about' },
    { text: 'Login', url: '/login' },
  ]);

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }

  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 0);
  }
}
