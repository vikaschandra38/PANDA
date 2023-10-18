import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountComponent } from './account.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
    declarations: [
      AccountComponent,
      LoginComponent, RegisterComponent, ForgotPasswordComponent,ConfirmEmailComponent, ResetPasswordComponent
    ],
    imports: [
      CommonModule,
      NgbCarouselModule,
      AccountRoutingModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: []
})
export class AccountModule { }
