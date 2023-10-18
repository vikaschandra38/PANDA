import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bak2Afrika';

  constructor(private translate: TranslateService){}

  ngOnInit(): void {

    if(localStorage.getItem('lang')){
      this.translate.use(localStorage.getItem('lang'))
    }
    else {
      localStorage.setItem('lang', 'en');
      this.translate.use(localStorage.getItem('lang'))
    }

  }
}
