import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '_signIn',
    pathMatch: 'full',
  },
  {
    path: '_profile',
    component: ProfileComponent,
  },
  {
    path: '_signIn',
    component: SignInComponent,
  },
  {
    path: '_signUp',
    component: SignUpComponent,
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
