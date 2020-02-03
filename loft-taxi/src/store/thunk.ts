import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

export type ThunkAction<S, A extends AnyAction, R> = (
  dispatch: Dispatch<A>,
  getState: () => S,
) => R;

export type ThunkDispatch<S, A extends AnyAction, R> =
  | ((action: ThunkAction<S, A, R>) => R)
  | Dispatch;

export const thunkMiddleware = <S>({ dispatch, getState }: MiddlewareAPI<Dispatch, S>) => (
  next: Dispatch,
) => (action: AnyAction | ThunkAction<S, AnyAction, any>) =>
  typeof action === 'function' ? action(dispatch, getState) : next(action);
