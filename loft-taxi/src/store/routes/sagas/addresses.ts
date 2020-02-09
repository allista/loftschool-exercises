import { SagaIterator } from 'redux-saga';
import { setLoading, RoutesActionType, setAddressList } from '../actions';
import { take, put, call } from 'redux-saga/effects';
import API, { Addresses } from 'shared/api';
import { addError } from 'store/errors';

export function* fetchAddressListSaga(): SagaIterator {
  yield take(RoutesActionType.FETCH_ADDRESS_LIST);
  yield put(setLoading(true));
  let data: Addresses | null = null;
  try {
    data = yield call(API.getAddressList);
    if (!data) yield put(addError({ message: 'Unable to retreive addresses from the server' }));
    else yield put(setAddressList(data));
  } finally {
    yield put(setLoading(false));
  }
}
