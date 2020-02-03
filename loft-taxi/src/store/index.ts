import { createStore, applyMiddleware, compose, Store, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { AppAction } from './reducer';
import rootSaga from './saga';
import { AppState } from './types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose | ((arg: any) => typeof compose);
    __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer;
  }
}

export type AppStore = Store<AppState, AppAction>;

export const initStore = (): AppStore => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
    : compose;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default initStore;
