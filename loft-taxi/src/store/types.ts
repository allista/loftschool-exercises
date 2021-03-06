import { Errors } from './errors';
import { User } from './user';
import { Routes } from './routes';

export type Action<A = any, P = any, E = {}> = {
  type: A;
  payload: P;
} & E;

export type TypeOfAction<T> = T extends Action<infer A, any> ? A : any;

export type PayloadOfAction<T> = T extends Action<any, infer P> ? P : any;

export interface AppState {
  errors: Errors;
  user: User;
  routes: Routes;
}
