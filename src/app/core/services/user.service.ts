
import { Injectable, signal } from '@angular/core';

export interface User {
  username: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = signal<User | null>(null);

  login(username: string): void {
    // Mock login logic
    const user: User = {
      username,
      avatar: 'kitty.png', // As per login.feature
    };
    this.currentUser.set(user);
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
