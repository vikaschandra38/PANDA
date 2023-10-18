import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  expertProfile: any;
  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'No-Auth': 'True'
    })
  }
  // Get single expert
  public getExpert(userId: any): Observable<any> {
    const requestURL = `${environment.apiURL}expert/${userId}`;
    return this.httpClient.get<any>(requestURL)
  }

  // Get All expert
  public getAllExpert(pageNo: any): Observable<any> {
    const requestURL = `${environment.apiURL}expert?page=/${pageNo}`;
    return this.httpClient.get<any>(requestURL)
  }

  // Get all published jobs
  public getAllPublishedJobs(pageNo: any): Observable<any> {
    const requestURL = `${environment.apiURL}jobs?page=/${pageNo}`;
    return this.httpClient.get<any>(requestURL)
  }

  // Add Expert education
  public addEducation(data: any): Observable<any> {
    const requestURL = `${environment.apiURL}expert/education`;
    return this.httpClient.post<any>(requestURL, data, this.httpOptions)
  }

  // Add Expert experience
  public addExperience(data: any): Observable<any> {
    const requestURL = `${environment.apiURL}expert/experience`;
    return this.httpClient.post<any>(requestURL, data, this.httpOptions)
  }

  // Add Expert language
  public addLanguage(data: any): Observable<any> {
    const requestURL = `${environment.apiURL}expert/language`;
    return this.httpClient.post<any>(requestURL, data, this.httpOptions)
  }

  // Add Expert education
  public addTravel(data: any): Observable<any> {
    const requestURL = `${environment.apiURL}expert/travel`;
    return this.httpClient.post<any>(requestURL, data, this.httpOptions)
  }

  // Update Expert
  public updateProfile(data: any): Observable<any> {
    const profile = {
      "userId": data.userId,
      "fname": data.fname,
      "lname": data.lname,
      "title": data.title,
      "location": data.location,
      "quote": data.quote,
      "biography": data.biography,
      "video": data.video,
      "preferences": data.preferences,
      "availability": data.availability,
      "skills": data.skills,
      "interest": data.skills,
      "email": data.email,
      "phone": data.phone,
      "website": data.website
    }
    const requestURL = `${environment.apiURL}expert/profile`;
    return this.httpClient.post<any>(requestURL, profile, this.httpOptions)
  }

  // Update Expert
  public saveJob(jID: any): Observable<any> {
    const data = {
      "userId": "632318e61c113c1a90248386",
      "id": jID
    }
    const requestURL = `${environment.apiURL}expert/save-job`;
    return this.httpClient.post<any>(requestURL, data, this.httpOptions)
  }

  // Save Event
  public saveEvent(cData: any): Observable<any> {
    console.log('cData', cData)
    const data = new FormData();
    data.append("title", cData.title);
    data.append("body", cData.body);
    data.append("location", cData.location);
    data.append("date", cData.date);
    data.append("photo", cData.photo);
    data.append("video", cData.video);
    data.append("type", cData.type);
    data.append("userId", cData.userId);
    const requestURL = `${environment.apiURL}event`;
    return this.httpClient.post<any>(requestURL, data)
  }

  // Get All expert
  public getAllOrganizations(pageNo: any): Observable<any> {
    const requestURL = `${environment.apiURL}company?page=/${pageNo}`;
    return this.httpClient.get<any>(requestURL)
  }
}
