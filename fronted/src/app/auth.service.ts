import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionTokenKey = 'sessionToken';

  constructor() { }

  saveSessionToken(token: string): void {
    localStorage.setItem(this.sessionTokenKey, token); 
  }

  getSessionToken(): string | null {
    return localStorage.getItem(this.sessionTokenKey); 
  }

  clearSessionToken(): void {
    localStorage.removeItem(this.sessionTokenKey); 
  }

  isAuthenticated(): boolean {
    return this.getSessionToken() !== null;
  }
}
