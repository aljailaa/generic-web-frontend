import {APP_INITIALIZER , NgModule } from '@angular/core';
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

import {CognitoService} from "./cognito.service";


export function initializeApp(cognitoService: CognitoService) {
  return (): Promise<any> => {
    return cognitoService.isAuthenticated();
  }
}

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
  providers: [
      AuthGuardService,
      AuthGuardSignInPageService,
      CognitoService,
      { provide: APP_INITIALIZER, useFactory: initializeApp , deps: [CognitoService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
