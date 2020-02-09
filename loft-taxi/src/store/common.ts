import { Reducer } from 'redux';
import { Action, TypeOfAction, PayloadOfAction } from './types';

export function _A<A extends Action, T = TypeOfAction<A>, P = PayloadOfAction<A>>(
  type: T,
  payload: P,
): Action<T, P>;
export function _A<A extends Action, T = TypeOfAction<A>, P = PayloadOfAction<A>, E = {}>(
  type: T,
  payload: P,
  extraProps: E,
): Action<T, P, E>;

export function _A<A extends Action, T = TypeOfAction<A>, P = PayloadOfAction<A>, E = {}>(
  type: T,
  payload: P,
  extraProps?: E,
) {
  return extraProps
    ? {
        type,
        payload,
        ...extraProps,
      }
    : { type, payload };
}

export const simpleReducer = <A extends Action>(
  actionType: TypeOfAction<A>,
  defaultState: PayloadOfAction<A>,
): Reducer<PayloadOfAction<A>, A> => (state, action) => {
  if (state === undefined) return defaultState;
  return action.type === actionType ? action.payload : state;
};

export const loadingReducer = <T = TypeOfAction<Action<any, boolean>>>(
  actionType: T,
): Reducer<number, Action<T, boolean>> => (state, action) => {
  if (state === undefined) return 0;
  if (action.type === actionType) {
    if (action.payload) return state + 1;
    if (state > 0) return state - 1;
  }
  return state;
};
