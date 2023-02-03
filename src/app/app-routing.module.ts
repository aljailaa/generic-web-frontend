import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthGuardService} from "./auth/auth-guard.service";
import {AuthGuardSignInPageService} from "./auth/auth-guard-sign-in-page.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: '_signIn',
    pathMatch: 'full',
  },
  {
    path: '_profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '_signIn',
    component: SignInComponent,
    canActivate: [AuthGuardSignInPageService]
  },
  {
    path: '_signUp',
    component: SignUpComponent,
    canActivate: [AuthGuardSignInPageService]

  },
  {
    path: '**',
    redirectTo: '_signIn',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
