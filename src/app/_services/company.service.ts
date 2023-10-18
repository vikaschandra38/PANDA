import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyProfile: any;
  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'No-Auth': 'True'
    })
  }

  // Get single company
  public getCompany(userId: any): Observable<any> {
    const requestURL = `${environment.apiURL}company/${userId}`;
    return this.httpClient.get<any>(requestURL)
  }

  // Update Company Contact
  public updateContact(data: any): Observable<any> {
    const formdata = {
      "userId": data.userId,
      "email": data.contactDetails.email,
      "phone": data.contactDetails.phone,
      "website": data.contactDetails.website,
      "headoffice": data.contactDetails.location.city
    }
    const requestURL = `${environment.apiURL}company/contact`;
    return this.httpClient.post<any>(requestURL, formdata, this.httpOptions)
  }

  // Update Company Profile
  public updateProfile(cData: any): Observable<any> {
    console.log('cData', cData)
    const data = new FormData();
    data.append("name", cData.orgName);
    data.append("photo", cData.orgPic);
    data.append("presentation", cData.orgProfile);
    data.append("sector", cData.sector);
    data.append("specialization", cData.specialization);
    data.append("companyType", cData.type);
    data.append("companySize", cData.size);
    data.append("foundedIn", cData.foundingDate);
    data.append("video", cData.vidLink);
    data.append("quote", cData.tagline);
    data.append("logo", cData.orgLogo);
    data.append("userId", cData.userId);
    const requestURL = `${environment.apiURL}company/profile`;
    return this.httpClient.post<any>(requestURL, data)
  }

  // Publish Job
  public publishJob(data: any): Observable<any> {
    const formdata = {
      "userId": data.userId,
      "title": data.title,
      "type": data.type,
      "country": data.country,
      "city": data.city,
      "sector": data.sector,
      "salary": data.salary,
      "description": data.description,
      "applicationLink": data.applicationLink,
      "emailLink": data.emailLink
    }
    const requestURL = `${environment.apiURL}jobs/publish`;
    return this.httpClient.post<any>(requestURL, formdata, this.httpOptions)
  }

  // Publish Job as Draft
  public saveJob(data: any): Observable<any> {
    const formdata = {
      "userId": data.userId,
      "title": data.title,
      "type": data.type,
      "country": data.country,
      "city": data.city,
      "sector": data.sector,
      "salary": data.salary,
      "description": data.description,
      "applicationLink": data.applicationLink,
      "emailLink": data.emailLink
    }
    const requestURL = `${environment.apiURL}jobs/save`;
    return this.httpClient.post<any>(requestURL, formdata, this.httpOptions)
  }

  // Get Job lists by UserID
  public getJobsByUID(userId: any): Observable<any> {
    const data = {
      "userId": userId
    }
    const requestURL = `${environment.apiURL}jobs`;
    return this.httpClient.post<any>(requestURL, data, this.httpOptions);
  }

  // Get All Jobs
  public getAllPublishedJobs(page: any): Observable<any> {
    const requestURL = `${environment.apiURL}jobs?page=${page}`;
    return this.httpClient.get<any>(requestURL)
  }

  // Get All Experts
  public getJobById(id: any): Observable<any> {
    const requestURL = `${environment.apiURL}jobs/${id}`;
    return this.httpClient.get<any>(requestURL)
  }

  // Get All Experts
  public getAllExperts(page: any): Observable<any> {
    const requestURL = `${environment.apiURL}expert?page=${page}`;
    return this.httpClient.get<any>(requestURL)
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

  // Save News
  public saveNews(cData: any): Observable<any> {
    console.log('cData', cData)
    const data = new FormData();
    data.append("title", cData.title);
    data.append("body", cData.body);
    data.append("location", cData.location);
    data.append("date", cData.date);
    data.append("photo", cData.photo);
    data.append("video", cData.video);
    data.append("userId", cData.userId);
    const requestURL = `${environment.apiURL}company/news/${cData.userId}`;
    return this.httpClient.post<any>(requestURL, data)
  }

}
