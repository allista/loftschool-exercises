import { combineReducers, Reducer } from 'redux';
import { ErrorAction, errorReducer } from './errors';
import { AppState } from './types';
import { UserAction, userReducer } from './user';

export type AppAction = ErrorAction | UserAction;

const rootReducer: Reducer<AppState, AppAction> = combineReducers({
  errors: errorReducer,
  user: userReducer,
});

export default rootReducer;
