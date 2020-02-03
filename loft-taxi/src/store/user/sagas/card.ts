import { SagaIterator } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';
import API, { CardData, CardPostResult } from 'shared/api';
import { addError } from 'store/errors';
import { getToken } from 'store/selectors';
import { CardPostAction, getCard, setCardInfo, setLoading, UserActionType } from '../actions';
import { AuthToken } from '../types';

export function* cardGetSaga(): SagaIterator {
  yield take(UserActionType.CARD_GET);
  yield put(setLoading(true));
  const token: AuthToken = yield select(getToken);
  let data: CardData | null = null;
  try {
    data = yield call(API.cardGetData, token);
    if (!data) yield put(addError({ message: 'The server returned no card info' }));
    else yield put(setCardInfo(data));
  } finally {
    yield put(setLoading(false));
  }
}

export function* cardPostSaga(): SagaIterator {
  const { payload }: CardPostAction = yield take(UserActionType.CARD_POST);
  yield put(setLoading(true));
  const token: AuthToken = yield select(getToken);
  let data: CardPostResult | null = null;
  try {
    data = yield call(API.cardPostData, { ...payload, token });
    if (!data)
      yield put(
        addError({
          message: 'Failed to update card information',
          content: ['server returned no data'],
        }),
      );
    else if (!data.success)
      yield put(addError({ message: 'Failed to update card information', content: [data.error] }));
    else yield put(getCard());
  } finally {
    yield put(setLoading(false));
  }
}
