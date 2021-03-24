import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    @Inject('API_URL') private apiUrl: String,
    private http: HttpClient
  ) { }

  getTodayReport(): Observable<any> {
    return this.http.get(this.apiUrl + '/queue/today-report');
  }

}
