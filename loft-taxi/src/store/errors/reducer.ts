import { Reducer } from 'redux';
import { Errors } from './types';
import { ErrorAction, ErrorActionType } from './actions';

export const errorReducer: Reducer<Errors, ErrorAction> = (state, action) => {
  if (state === undefined) return {};
  switch (action.type) {
    case ErrorActionType.ERROR:
      const payload = action.payload;
      return { ...state, ['' + Date.now()]: payload };
    case ErrorActionType.REMOVE_ERROR:
      const key = action.payload;
      if (key in state) {
        const newState = { ...state };
        delete newState[key];
        return newState;
      }
      return state;
    case ErrorActionType.CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};
