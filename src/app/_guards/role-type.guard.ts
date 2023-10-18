import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services';

@Injectable({
  providedIn: 'root'
})
export class RoleTypeGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('guard', )
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.userService.checkLoggedIn()) {
      const userRole = localStorage.getItem('userType');
      if (route.data['role'] && route.data['role'] !== userRole) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
