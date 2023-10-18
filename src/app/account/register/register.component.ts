import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomValidators } from 'src/app/_helpers/password-validator';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  verificationLinkSent = false; // After Signup
  confirmedRegistration: boolean = false;
  registration: boolean = false;
  registerUser = {
    expert: false,
    organization: false
  }
  viewPass = false;
  viewCPass = false;
  emailExist = false;

  signupForm: FormGroup;
  emailPattern = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
  constructor(private route: ActivatedRoute,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let currentMode;

    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log('mode', params.get('mode'));
      currentMode = params.get('mode') || 0
    })

    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl(null, [Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        // CustomValidators.patternValidator(
        //   /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        //   { hasSpecialCharacters: true }),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8),
      ])]),
      confirmPassword: new FormControl(null, [this.confirmValidator])
    })

    if (currentMode == 1) {
      this.verificationLinkSent = true;
      this.confirmedRegistration = false;
      this.registration = false;
    } else if (currentMode == 2) {
      this.confirmedRegistration = true;
      this.verificationLinkSent = false;
      this.registration = false;
    } else {
      this.registration = true;
      this.confirmedRegistration = false
      this.verificationLinkSent = false
    }
  }

  sendLink() {
    // this.router.navigate(['account/login']);
  }

  isSubmit: boolean = false;
  register() {
    console.log(this.registerUser);
    this.isSubmit=true
    this.emailExist = false;
    if (this.signupForm.invalid || !this.registerUser.expert && !this.registerUser.organization) {
      return;
    }

    let type = '';
    if (this.registerUser.expert) {
      type = 'expert'
    }
    if (this.registerUser.organization) {
      type = 'company'
    }
    const data = {
      "email": this.signupForm.get('email').value,
      "password": this.signupForm.get('password').value,
      "type": type,
      "phonetoken": "This is a phone token from firebase"
    }
    this.userService.signUp(data).subscribe(
      res => {
        this.emailExist = false;
        this.isSubmit=false;
        console.log('res', res, res.status);
        if (res.success) {
          this.verificationLinkSent = true;
          this.registration = false;
          // this.router.navigate(['account/login']);
        } else {

        }
      },
      err => {
        console.log('err', err)
        if (err.status == 409) {
          //Email exists
          this.emailExist = true;
        } else {
          this.emailExist = false
        }
      }
    )
  }


  
   /* Validators */
   validateConfirmPassword(): void {
    setTimeout(() => this.signupForm.get('confirmPassword').updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.signupForm.get('password').value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
