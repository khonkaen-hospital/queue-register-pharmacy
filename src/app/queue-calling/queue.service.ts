import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(
    @Inject('API_URL') private apiUrl: String,
    @Inject('ROBOT_API_URL') private robotApiUrl: String,
    private http: HttpClient
  ) { }

  getActiveQueue(): Observable<any> {
    return this.http.get(this.apiUrl + '/queue/all-queue/active');
  }

  getVisitHistoryQueue(params: HttpParams): Observable<any> {
    return this.http.get(this.apiUrl + '/queue/his-visit-history', { params: params });
  }

  getPrintData(queueId: string): Observable<any> {
    return this.http.post(this.apiUrl + '/print/queue/prepare/data', { queueId: queueId });
  }

  registerQueue(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/queue/register/pharmacy-robot', data);
  }

  getHisVisits(params: HttpParams): Observable<any> {
    return this.http.get(this.apiUrl + '/queue/his-visit-robot', { params: params });
  }

  getAutoQueuFormPharmacy(params: HttpParams): Observable<any> {
    return this.http.get(this.apiUrl + '/queue/his-pharmacy-robot', { params: params });
  }

  getPriorities(): Observable<any> {
    return this.http.get(this.apiUrl + '/priorities');
  }

  setRobotQueueCheckin(data: any): Observable<any> {
    return this.http.post(this.robotApiUrl + '/api/quecheckin', data);
  }
}
