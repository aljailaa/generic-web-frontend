import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {CognitoService} from "../cognito.service";

@Injectable()
export class AuthGuardSignInPageService implements CanActivate {
  constructor(private router:Router,
              private store: Store<{ loginState: boolean }>,
              private cognitoService: CognitoService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {


    if (this.cognitoService.getIsAuthenticated())  {
      //redirect to login/home page etc
      this.router.navigate(['/_profile']);
      //return false to cancel the navigation
      return false;
    }

    return true;
  }



}
