import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

interface NavLink {
  text: string;
  url: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, UserAvatarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLoggedIn = false; // Mock data, replace with real auth state
  user = { name: 'Annie', avatarUrl: 'https://i.pravatar.cc/40' }; // Mock user data
  isMenuOpen = false;

  navLinks: NavLink[] = [
    { text: 'Food Search', url: '/food-search' },
    { text: 'About Us', url: '/about' },
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
