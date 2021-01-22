import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(
    @Inject('API_URL') private apiUrl: String,
    private http: HttpClient
  ) { }

  getQueue(): Observable<any> {
    return this.http.get(this.apiUrl + '/queue/all-queue/active');
  }
}
