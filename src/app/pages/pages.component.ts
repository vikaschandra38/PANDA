import { NotificationService } from './../_services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { UserService } from '../_services';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  mainPage: boolean = true;
  currentURL: any;
  expertNoti = false;
  companyNoti = false;
  constructor(
    private router: Router,
    public sharedService: SharedService,
    public userService: UserService,
    public notificationService: NotificationService,
    private translate: TranslateService
  ) {
    console.log('userService.loggedInUser', this.userService.loggedInUser)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((e:any) => {
        console.log(e);
        this.currentURL = e['url'];
        console.log('this.currentURL', this.currentURL)
        this.userService.getUser();
        console.log('loggedin', this.userService.loggedInUser)
      });
  }

  ngOnInit(): void {
    this.notificationService.getAllNotifications(this.userService.loggedInUser._id).subscribe(
      res => {
        console.log('notis->', res);
        if (res.success) {
          this.notificationService.notifications = res.data
        }
      }
    )
  }

  // Scroll to Section
  scrollToSection(sectionName: string): void {
    const firstElementWithError = document.querySelector('#' + sectionName);
    this.scrollTo(<Element>firstElementWithError);
  }

  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  onLogout(){
    this.userService.logout();
  }

  onChangeLanguage(lang:string){
    this.translate.use(lang),
    localStorage.setItem('lang', lang)
  }
}
