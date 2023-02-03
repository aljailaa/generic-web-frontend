import { createReducer, on } from '@ngrx/store';
import { login, logout, reset } from '../actions/loginstatus.actions';

export const initialState = false;

export const counterReducer = createReducer(
  initialState,
  on(login, (state) => true),
  on(logout, (state) => false),
  on(reset, (state) => false)
);
