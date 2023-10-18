import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false;
  loggedInUser: any;
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json', 'No-Auth': 'True'
    })
  }

  public signUp(user: any): Observable<any> {
    const requestURL = `${environment.apiURL}users/signup`;
    return this.httpClient.post<any>(requestURL, user, this.httpOptions)
  }

  public confirmEmail(code: any): Observable<any> {
    const requestURL = `${environment.apiURL}users/confirm-email/?code=${code}`;
    return this.httpClient.post<any>(requestURL, this.httpOptions)
  }

  public login(user: any): Observable<any> {
    const requestURL = `${environment.apiURL}users/login`;
    return this.httpClient.post<any>(requestURL, user, this.httpOptions)
  }

  public forgotPassword(user: any): Observable<any> {
    const requestURL = `${environment.apiURL}users/forgot-Password`;
    return this.httpClient.post<any>(requestURL, user, this.httpOptions)
  }

  public resetPassword(user: any, code): Observable<any> {
    const requestURL = `${environment.apiURL}/users/reset-password/?code=${code}`;
    return this.httpClient.post<any>(requestURL, user, this.httpOptions)
  }

  setUser(userData: any) {
    localStorage.setItem('userPData', JSON.stringify(userData));
    localStorage.setItem('userType', userData.type);
    localStorage.setItem('userPToken', userData.access_token);
    localStorage.setItem('userPRToken', userData.refresh_token);
    this.isLoggedIn = true;
    this.loggedInUser = localStorage['userPData'] ? JSON.parse(localStorage['userPData']) : '';
  }

  getUser() {
    this.loggedInUser = localStorage['userPData'] ? JSON.parse(localStorage['userPData']) : '';
    this.isLoggedIn = localStorage['userPData'] ? true : false;
  }
  checkLoggedIn(): boolean {
    return this.isLoggedIn = localStorage['userPData'] ? true : false;
  }
  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.loggedInUser = {}
  }

}
