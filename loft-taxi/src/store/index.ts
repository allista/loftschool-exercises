import { createStore, applyMiddleware, compose, Store, StoreEnhancer } from 'redux';
import rootReducer, { AppAction } from './reducer';
import { AppState } from './types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose | ((arg: any) => typeof compose);
    __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer;
  }
}

export type AppStore = Store<AppState, AppAction>;

export const initStore = (): AppStore => {
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return store;
};

export default initStore;
