import { Saga } from 'redux-saga';
import { all, call, spawn } from 'redux-saga/effects';
import { handleError } from './errors';
import {
  authSaga,
  cardGetSaga,
  cardPostSaga,
  registerSaga,
  userLoginSaga,
  userLogoutSaga,
} from './user';
import { fetchAddressListSaga, fetchRouteSaga } from './routes';

const makeWatcher = (saga: Saga): Saga => {
  return function* watcher() {
    while (true) {
      try {
        yield saga();
      } catch (error) {
        if (!error.handled) yield call(handleError, error);
      }
    }
  };
};

export default function* rootSaga() {
  yield all(
    [
      authSaga,
      userLoginSaga,
      userLogoutSaga,
      registerSaga,
      cardGetSaga,
      cardPostSaga,
      fetchAddressListSaga,
      fetchRouteSaga,
    ].map(saga => spawn(makeWatcher(saga))),
  );
}
