import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  emailConfirmed = ''
  constructor(
    private route: ActivatedRoute,
    public userService: UserService
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log('mode', params['code']);
      if (params && params['code']) {
        this.userService.confirmEmail(params['code']).subscribe(
          res => {
            console.log('res', res);
            if (res.success) {
              this.userService.setUser(res.data);
              this.emailConfirmed = 'confirmed';
            }
          },
          err => {
            console.log('err', err);
            this.emailConfirmed = err.error.message;
          }
        )
      } else {

      }
    })
   }

  ngOnInit() {
  }

}
