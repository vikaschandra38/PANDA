import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { GooglePlacesComponent } from './shared/google-places/google-places.component';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
@NgModule({
  declarations: [
    AppComponent,
    ContactUsComponent,
    GooglePlacesComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ToastrModule.forRoot(), // ToastrModule added

    // ngx-translate and the loader module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
/*
Organizations can access in OFF mode to :

- Sign in/register
- Main page: view all blocks and can click on all items on the page incl. the footer (Contact us,…)

Organizations can access in ON MODE to:

- Organizations homepage: view all blocks in this page, user filters to search experts, redirection to expert private page, add experts in favorites, search experts in the travel map, use travel map filters, activate/disable travel map notification, view events, search events, use events filters, add events in favorites, activate/disable events notifications, redirection to notifications page, redirection to organization profile page, view announcements

- *Expert private page: view all the page, share the page, view events, add events in fav, contact the expert

-Organization private page* : view all the page, redirection to edit profile, add news, add job offers, add events, edit contact details, create announcements

- Organization profile page (edit)

- notifications page : view + edit

Expert can access in OFF MODE to :

- Sign in /register page
- Main page : view all blocks and can click on all items of the page incl. in the footer (contact us,..)


Experts can access in ON Mode to:

- *Experts homepage *: view all blocks in this page, use filters to search organizations, redirection to organization private page, add organizations in favorites, search jobs, use job filters, view jobs, add job in fav (in the job description screen), see experts in travel map, user travel map filters, active/disable travel map notifications, view events, search events, use events filters, add events in fav, activate/disable events notifications, redirection to notifications page, redirection to update expert profile, view announcements

- Organization private page : view all the page, open job offers, add in fav job offers (button in job description screen), click to open events, add event in fav, activate/disable events notifications, contact organization

- contact the organization (edit)

- *Expert profile page * (edit)

- expert private page (view + edit): redirection to edit profile page, add saved job offers, add events, redirection to my contact details, create announcements

- create event (edit)

- job description (view + add fav)

- *notifications page (view + edit)
*/
