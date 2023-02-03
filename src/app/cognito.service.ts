import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import { Store } from '@ngrx/store';
import { login, logout } from './store/actions/loginstatus.actions';


import {Amplify,  Auth } from 'aws-amplify';

import { environment } from '../environments/environment';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  private isUserAuthenticated: boolean = true;

  constructor(private store: Store<{ loginState: boolean }>) {
    Amplify.configure({
      Auth: environment.cognito,
    });

    // this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp(user.name, user.password, user.email);
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.name, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
      .then(() => {
        this.store.dispatch(login())
        // this.authenticationSubject.next(true);
      });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => {
        this.store.dispatch(logout())
        // this.authenticationSubject.next(false);
      });
  }

  public isAuthenticated(): Promise<boolean> {

    let loginState = false;
    this.store.select('loginState').subscribe(s => loginState = s);

    if (loginState) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            this.store.dispatch(login())
            return true;
          } else {
            this.store.dispatch(logout())
            return false;
          }
        }).catch(() => {
          this.store.dispatch(logout())
          return false;
        });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
      .then((cognitoUser: any) => {
        return Auth.updateUserAttributes(cognitoUser, user);
      });
  }

  public updateIsAuthenticated(val: boolean) {
    this.isUserAuthenticated = val;
  }

   public getIsAuthenticated() {
    return this.isUserAuthenticated ;
  }
}
