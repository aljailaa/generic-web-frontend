import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';

import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/reducers/loginstatus.reducer';
import {AuthGuardService} from "./auth/auth-guard.service";
import {AuthGuardSignInPageService} from "./auth/auth-guard-sign-in-page.service";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ loginState: counterReducer })
  ],
  providers: [AuthGuardService, AuthGuardSignInPageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
