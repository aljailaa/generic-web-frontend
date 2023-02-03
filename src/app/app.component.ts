import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CognitoService } from './cognito.service';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title: string = 'Ameen App';
  loginState$: Observable<boolean>;
  isAuthenticated: boolean = false;


  constructor(private router: Router,
              private cognitoService: CognitoService,
              private store: Store<{ loginState: boolean }>) {
    this.loginState$ = store.select('loginState');
  }

  public ngOnInit(): void {
      this.loginState$.subscribe(val => {
          this.cognitoService.updateIsAuthenticated(val);
          this.isAuthenticated = val;
        }
      );
  }

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/_signIn']);
    });
  }

}
