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
): Reducer<PayloadOfAction<A>, A> => (state = defaultState, action) =>
  action.type === actionType ? action.payload : state;
