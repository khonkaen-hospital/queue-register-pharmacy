import { Injectable } from '@angular/core';
import { UserAuth } from './auth.service';

const TOKEN_KEY = 'jwt_token';
const USER_KEY = 'currentUser';
const REMEMBERME_KEY = 'rememberCurrentUser';
const SERVICEPOINTS_KEY = 'servicePoints';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  setRememberMe(value: string): void {
    window.localStorage.setItem(REMEMBERME_KEY, value);
  }

  resetCredentials(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(SERVICEPOINTS_KEY);
  }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public setCurrentUser(user: UserAuth): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public setServicePoints(servicePoints: Array<any>): void {
    window.localStorage.setItem(SERVICEPOINTS_KEY, JSON.stringify(servicePoints));
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public getUser(): string | null {
    const userData = window.localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }
}
