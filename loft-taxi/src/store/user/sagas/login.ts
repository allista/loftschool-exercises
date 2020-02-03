import { SagaIterator } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { PageID } from 'shared';
import API, { AuthResult } from 'shared/api';
import { _A } from 'store/common';
import { setPage } from 'store/page';
import {
  LoginAction,
  LogoutAction,
  setCardInfo,
  setLoading,
  setToken,
  UserActionType,
  getCard,
} from '../actions';

export function* userLoginSaga(): SagaIterator {
  const { payload }: LoginAction = yield take(UserActionType.LOGIN);
  yield put(setLoading(true));
  let data: AuthResult | null = null;
  try {
    data = yield call(API.auth, payload);
    yield put(getCard());
  } finally {
    yield put(setLoading(false));
  }
  yield put(_A(UserActionType.AUTH, data));
}

export function* userLogoutSaga(_action: LogoutAction): SagaIterator {
  yield take(UserActionType.LOGOUT);
  yield put(setToken(null));
  yield put(setCardInfo(null));
  yield put(setPage(PageID.LOGIN));
}
