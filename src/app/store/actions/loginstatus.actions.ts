import { createAction } from '@ngrx/store';

export const login = createAction('[user login] boolean');
export const logout =  createAction('[user logout] boolean');

export const reset =  createAction('[reset] boolean');
