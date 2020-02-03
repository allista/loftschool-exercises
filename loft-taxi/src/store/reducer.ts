import { combineReducers, Reducer } from 'redux';
import { PageAction, pageReducer } from './page';
import { AppState } from './types';

export type AppAction = PageAction;

const rootReducer: Reducer<AppState, AppAction> = combineReducers({
  pageID: pageReducer,
});

export default rootReducer;
