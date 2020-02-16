import { combineReducers, Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { simpleReducer, loadingReducer } from 'store/common';
import { SetCardInfoAction, SetTokenAction, UserAction, UserActionType } from './actions';
import { User } from './types';

export const userReducer: Reducer<User, UserAction> = persistReducer(
  {
    key: 'loft-taxi-user',
    blacklist: ['loading', 'card'],
    storage,
  },
  combineReducers({
    loading: loadingReducer(UserActionType.SET_LOADING),
    token: simpleReducer<SetTokenAction>(UserActionType.SET_TOKEN, null),
    card: simpleReducer<SetCardInfoAction>(UserActionType.SET_CARD_INFO, null),
  }),
);
