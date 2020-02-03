import { combineReducers, Reducer } from 'redux';
import { ErrorAction, errorReducer } from './errors';
import { PageAction, pageReducer } from './page';
import { AppState } from './types';
import { UserAction, userReducer } from './user';

export type AppAction = ErrorAction | UserAction | PageAction;

const rootReducer: Reducer<AppState, AppAction> = combineReducers({
  pageID: pageReducer,
  errors: errorReducer,
  user: userReducer,
});

export default rootReducer;
