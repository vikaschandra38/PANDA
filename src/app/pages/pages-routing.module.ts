import { ExpertPrivateComponent } from './expert-private/expert-private.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ExpertsComponent } from './experts/experts.component';
import { OrganizationPrivateComponent } from './organization-private/organization-private.component';
import { OrganizationPublicComponent } from './organization-public/organization-public.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { ExpertProfileComponent } from './expert-profile/expert-profile.component';
import { RoleTypeGuard } from '../_guards/role-type.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'organizations',
        component: OrganizationsComponent,
        canActivate: [RoleTypeGuard],
        data: {
          role: 'company'
        }
      },
      {
        path: 'experts',
        component: ExpertsComponent,
        canActivate: [RoleTypeGuard],
        data: {
          role: 'expert'
        }
      },
      {
        path: 'organization-private',
        component: OrganizationPrivateComponent,
        canActivate: [RoleTypeGuard],
        data: {
          role: 'company'
        }
      },
      {
        path: 'organization-public',
        component: OrganizationPublicComponent
      },
      {
        path: 'organization-profile',
        component: OrganizationProfileComponent,
        canActivate: [RoleTypeGuard],
        data: {
          role: 'company'
        }
      },
      {
        path: 'expert-profile',
        component: ExpertProfileComponent,
        canActivate: [RoleTypeGuard],
        data: {
          role: 'expert'
        }
      },
      {
        path: 'expert-private',
        component: ExpertPrivateComponent,
        canActivate: [RoleTypeGuard],
        data: {
          role: 'expert'
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
export const RoutingComponents = [
  PagesComponent,
  HomeComponent, OrganizationsComponent, ExpertsComponent,
  OrganizationPrivateComponent, OrganizationPublicComponent, OrganizationProfileComponent, ExpertProfileComponent, ExpertPrivateComponent
]
