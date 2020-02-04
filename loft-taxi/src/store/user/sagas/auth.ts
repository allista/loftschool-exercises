import { SagaIterator } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import { PageID } from 'shared';
import { addError } from 'store/errors';
import { AuthAction, setToken, UserActionType } from '../actions';

export function* authSaga(): SagaIterator {
  const { payload, history }: AuthAction = yield take(UserActionType.AUTH);
  if (!payload) {
    yield put(addError({ message: 'Server returned no data on auth request' }));
    return;
  }
  if (payload.success) {
    yield put(setToken(payload.token));
    history.push(PageID.MAP);
  } else yield put(addError({ message: 'Authorization error', content: [payload.error] }));
}
