import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login(): void {
    if (this.form.valid && this.form.value.username) {
      this.userService.login(this.form.value.username);
      this.router.navigate(['/profile']);
    }
  }
}
