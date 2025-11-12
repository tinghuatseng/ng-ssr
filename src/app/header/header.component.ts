import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { UserService } from '../core/services/user.service';

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
  private userService = inject(UserService);

  isLoggedIn = computed(() => !!this.userService.currentUser());
  user = computed(() => {
    const currentUser = this.userService.currentUser();
    return {
      name: currentUser?.username || '',
      avatarUrl: currentUser?.avatar || '',
    };
  });

  isMenuOpen = signal(false);
  isScrolled = signal(false);

  navLinks = computed<NavLink[]>(() => [
    { text: 'Food Search', url: '/food-search' },
    { text: 'About Us', url: '/about' },
  ]);

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }

  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 0);
  }
}
