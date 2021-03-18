import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { User } from 'src/app/auth/user';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { timeout } from 'rxjs/operators';
export interface UserLogin {
  username: string,
  password: string
}

export interface UserAuth {
  token: string,
  servicePoints?: Array<any>,
  statusCode: number,
  message?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;
  private helper: JwtHelperService = new JwtHelperService();

  constructor(
    @Inject('API_URL') private apiUrl: String,
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
  }

  login(data: UserLogin): Observable<UserAuth> {
    return this.http.post<UserAuth>(this.apiUrl + '/login', data)
      .pipe(map(user => {
        if (user && user.token) {
          this.tokenStorage.setToken(user.token);
          this.tokenStorage.setCurrentUser(user);
          if (user.servicePoints !== undefined) {
            this.tokenStorage.setServicePoints(user.servicePoints);
          }
        }
        return user;
      }));
  }

  logout() {
    this.tokenStorage.resetCredentials();
  }

  getTokenExpirationDate(): Date | null {
    const token = this.tokenStorage.getToken() || undefined;
    return this.helper.getTokenExpirationDate(token);
  }

  isTokenExpired(): boolean {
    const token = this.tokenStorage.getToken();
    if (!token) return true;
    return this.helper.isTokenExpired(token);
  }
}
