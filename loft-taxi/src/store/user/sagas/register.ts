import { SagaIterator } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import API, { AuthResult } from 'shared/api';
import { _A } from 'store/common';
import { RegisterAction, UserActionType, setLoading } from '../actions';

export function* registerSaga(): SagaIterator {
  const { payload, history }: RegisterAction = yield take(UserActionType.REGISTER);
  yield put(setLoading(true));
  let data: AuthResult | null = null;
  try {
    data = yield call(API.register, payload);
    yield put(_A(UserActionType.AUTH, data, { history }));
  } finally {
    yield put(setLoading(false));
  }
}
