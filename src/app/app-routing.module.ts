import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  {
    path: 'account',
    loadChildren:() => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: '',
    loadChildren:() => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
