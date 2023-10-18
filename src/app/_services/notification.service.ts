import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications: any;
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'No-Auth': 'True'
    })
  }

  // Get All Notification
  public getAllNotifications(userId: any): Observable<any> {
    const data = {
      "userId": userId
    }
    const requestURL = `${environment.apiURL}notify/notifications`;
    return this.httpClient.post<any>(requestURL, data, this.httpOptions)
  }
}
