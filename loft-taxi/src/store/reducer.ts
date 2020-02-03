import { combineReducers, Reducer } from 'redux';
import { ErrorAction, errorReducer } from './errors';
import { PageAction, pageReducer } from './page';
import { AppState } from './types';

export type AppAction = ErrorAction | PageAction;

const rootReducer: Reducer<AppState, AppAction> = combineReducers({
  pageID: pageReducer,
  errors: errorReducer,
});

export default rootReducer;
