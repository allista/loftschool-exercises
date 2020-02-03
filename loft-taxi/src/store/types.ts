import { PageID } from 'shared';
export type Action<A = any, P = any> = {
  type: A;
  payload: P;
};

export type TypeOfAction<T> = T extends Action<infer A, any> ? A : any;

export type PayloadOfAction<T> = T extends Action<any, infer P> ? P : any;

export interface AppState {
  pageID: PageID;
}
