import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { CommonModule } from '@angular/common';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  user = this.userService.currentUser;

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
