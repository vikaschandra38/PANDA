import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  accountExists = '';
  constructor(private formBuilder: FormBuilder, private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.value)
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const loginData = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }
    this.userService.login(loginData)
    .pipe(first()).subscribe(
      data => {
        this.loading = false;
        console.log('login', data)
        if (data.success) {
          this.accountExists = '';
          this.userService.setUser(data.data);
          if(data.data.type === 'company'){
            this.router.navigate(['/', 'organizations'])
          }else if(data.data.type === 'expert'){
            this.router.navigate(['/', 'experts']);
          }else{
            this.router.navigate(['/'])
          }
        } else {
          this.accountExists = data.message;
          }
        // this.router.navigate([this.returnUrl]);
      },
      error => {
        this.loading = false;
        console.log('err', error)
        if (error.status == 401) {
          this.accountExists = error.error.data;
        } else {
          this.accountExists = error.error.message;
        }
      }
    );
  }

  forgotPassword() {
    this.router.navigate(['/account/forgot-password'])
  }
}
