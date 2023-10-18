import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  verificationLinkSent: boolean = false

  forgotForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,public userService: UserService) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    let currentMode;

    this.route.paramMap.subscribe((params: ParamMap) => {
      currentMode = params.get('mode') || 0
    })

    if (currentMode == 1) {
      this.verificationLinkSent = true
    }
  }

  get f() { return this.forgotForm.controls; }

  resMessage:any=null;
  onSubmit() {
    this.submitted = true;
    console.log(this.forgotForm.value)
    // stop here if form is invalid
    if (this.forgotForm.invalid) {
      return;
    }

    this.loading = true;
    const loginData = {
      "email": this.forgotForm.value.email
    }

    
    this.userService.forgotPassword(loginData).subscribe(res => {
      this.resMessage=res;
    }, err=> this.resMessage = err.error)
                                                 
  }
}
