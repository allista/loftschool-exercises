import { SagaIterator } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import { PageID } from 'shared';
import { AuthResult } from 'shared/api';
import { addError } from 'store/errors';
import { setPage } from 'store/page';
import { Action } from 'store/types';
import { setToken, UserActionType } from '../actions';

type AuthAction = Action<UserActionType.AUTH, AuthResult>;

export function* authSaga(): SagaIterator {
  const { payload }: AuthAction = yield take(UserActionType.AUTH);
  if (!payload) {
    yield put(addError({ message: 'Server returned no data on auth request' }));
    return;
  }
  if (payload.success) {
    yield put(setToken(payload.token));
    yield put(setPage(PageID.MAP));
  } else yield put(addError({ message: 'Authorization error', content: [payload.error] }));
}
