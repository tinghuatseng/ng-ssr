
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have null currentUser initially', () => {
    expect(service.currentUser()).toBeNull();
  });

  it('should set currentUser on login', () => {
    const username = 'testuser';
    service.login(username);
    const user = service.currentUser();
    expect(user).not.toBeNull();
    expect(user?.username).toBe(username);
    expect(user?.avatar).toBe('assets/kitty.png');
  });

  it('should clear currentUser on logout', () => {
    service.login('testuser');
    expect(service.currentUser()).not.toBeNull();
    service.logout();
    expect(service.currentUser()).toBeNull();
  });
});
