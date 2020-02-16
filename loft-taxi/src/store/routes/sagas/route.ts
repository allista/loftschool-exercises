import { SagaIterator } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';
import API, { Route } from 'shared/api';
import { addError } from 'store/errors';
import { getCurrentRoute, getAddressList } from 'store/selectors';
import { addRoute, RoutesActionType, setLoading } from '../actions';

export function* fetchRouteSaga(): SagaIterator {
  yield take([
    RoutesActionType.SELECT_ADDRESS,
    RoutesActionType.REMOVE_ADDRESS,
    RoutesActionType.FETCH_NEXT_ROUTE,
  ]);
  yield put(setLoading(true));
  try {
    const { addresses, routes } = yield select(getCurrentRoute);
    const routeToFetch = routes.length;
    if (routeToFetch >= addresses.length - 1) {
      console.log('Routes are present between all the addresses');
      return;
    }
    let data: Route | null = null;
    const addressList = yield select(getAddressList);
    const address1 = addressList[addresses[routeToFetch]];
    const address2 = addressList[addresses[routeToFetch + 1]];
    if (!address1 || !address2) return;
    console.log(`Fetching route ${routeToFetch}: ${address1} -> ${address2}`);
    data = yield call(API.getRoute, address1, address2);
    if (!data) {
      yield put(addError({ message: 'Unable to retreive route from the server' }));
    } else {
      yield put(addRoute(data));
    }
  } finally {
    yield put(setLoading(false));
  }
}
