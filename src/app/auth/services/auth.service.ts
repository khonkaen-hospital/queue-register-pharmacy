import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/auth/user';
import { TokenStorageService } from './token-storage.service';

export interface UserAuth {
  username: string,
  password: string
}

export interface LoginResponse {
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

  constructor(
    @Inject('API_URL') private apiUrl: String,
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(data: UserAuth): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + '/login', data).pipe(map(user => {
      if (user.token) {
        this.tokenStorage.saveToken(user.token);
        this.tokenStorage.saveUser(user);
      }
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
