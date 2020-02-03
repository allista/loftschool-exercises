import { combineReducers, Reducer } from 'redux';
import { simpleReducer } from 'store/common';
import {
  SetCardInfoAction,
  SetLoadingAction,
  SetTokenAction,
  UserAction,
  UserActionType,
} from './actions';
import { User } from './types';

const loadingReducer: Reducer<number, SetLoadingAction> = (state = 0, action) => {
  if (action.type === UserActionType.SET_LOADING) {
    if (action.payload) return state + 1;
    if (state > 0) return state - 1;
  }
  return state;
};

export const userReducer: Reducer<User, UserAction> = combineReducers({
  loading: loadingReducer,
  token: simpleReducer<SetTokenAction>(UserActionType.SET_TOKEN, null),
  card: simpleReducer<SetCardInfoAction>(UserActionType.SET_CARD_INFO, null),
});
