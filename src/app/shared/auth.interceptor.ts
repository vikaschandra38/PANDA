import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../_services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: any;
  omitCalls = ['auth'];
  skipInterceptor = false;
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request', request);
    const skip = request.url.includes('/users/');
    this.token = localStorage.getItem("userPToken");
    const tokenizedReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + this.token) });
    return next.handle(tokenizedReq).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401 && !skip) {
              this.userService.logout();
              this.router.navigateByUrl('/');
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === 401 && !skip) {
            this.userService.logout();
            this.router.navigateByUrl('/');
          }
          else if (error.status === 404) {
            this.userService.logout();
            this.router.navigateByUrl('/');
          }
        }
      }));
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   this.token = localStorage.getItem("userPToken");
  //   if (this.token || this.skipInterceptor) {
  //     const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
  //     return next.handle(tokenizedReq).pipe(map((event: HttpEvent<any>) => {
  //       if (event instanceof HttpResponse) {
  //         if (event.status === 401) {
  //           this.userService.logout();
  //           this.router.navigateByUrl('/');
  //         }
  //       }
  //       return event;
  //     }));
  //   } else {
  //     this.userService.logout();
  //     this.router.navigateByUrl('/');
  //   }
  //   return next.handle(req);
  // }
}
