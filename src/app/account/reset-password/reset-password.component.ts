import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/_helpers/password-validator';
import { UserService } from 'src/app/_services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    public userService: UserService,
    private acRoute: ActivatedRoute,
    private router: Router
  ) { }

  viewPass = false;
  viewCPass = false;
  resetPassForm: FormGroup;
  code:string='';
  ngOnInit(): void {

    this.acRoute.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get('code') || '';
      if(this.code==''){
        this.router.navigate(['/'])
      }
    })

    this.resetPassForm = new FormGroup({
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
  }


  resMessage:any=null;
  submitted:boolean=false;
  loading:boolean=false;
  onSubmit() {
    this.submitted = true;
    console.log(this.resetPassForm.value)
    // stop here if form is invalid
    if (this.resetPassForm.invalid) {
      return;
    }

    this.loading = true;
    const data = {
      "password": this.resetPassForm.value.password
    }

    
    this.userService.resetPassword(data, this.code).subscribe(res => {
      this.resMessage=res;
    }, err=> this.resMessage = err.error)
                                                 
  }


   /* Validators */
   validateConfirmPassword(): void {
    setTimeout(() => this.resetPassForm.get('confirmPassword').updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.resetPassForm.get('password').value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
