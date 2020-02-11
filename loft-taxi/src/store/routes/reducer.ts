import { combineReducers, Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loadingReducer, simpleReducer } from 'store/common';
import {
  CurrentRouteAction,
  RoutesAction,
  RoutesActionType,
  SetAddressListAction,
} from './actions';
import { CurrentRoute, Routes } from './types';

export const currentRouteDefState = {
  addresses: [undefined, undefined],
  routes: [],
};

const currentRouteReducer: Reducer<CurrentRoute, CurrentRouteAction> = persistReducer(
  {
    key: 'loft-taxi-currentRoute',
    blacklist: ['routes'],
    storage,
  },
  (state, action) => {
    if (state === undefined) return currentRouteDefState;
    const { routes, addresses } = state;
    switch (action.type) {
      case RoutesActionType.SELECT_ADDRESS:
        const [addressKey, idx1] = action.payload;
        if (idx1 < 0 && addresses[addresses.length - 1] !== addressKey)
          return { ...state, addresses: [...addresses, addressKey] };
        if (
          idx1 < addresses.length &&
          addresses[idx1 - 1] !== addressKey &&
          addresses[idx1 + 1] !== addressKey
        ) {
          const newAddresses = addresses.slice();
          newAddresses[idx1] = addressKey;
          return { ...state, addresses: newAddresses, routes: routes.slice(0, idx1 - 1) };
        }
        break;
      case RoutesActionType.REMOVE_ADDRESS:
        const idx2 = action.payload;
        const newAddresses = addresses.slice();
        newAddresses.splice(idx2, 1);
        return {
          ...state,
          addresses: newAddresses.filter((key, idx, all) => {
            if (idx < idx2) return true;
            return key !== all[idx - 1];
          }),
          routes: routes.slice(0, idx2 - 1),
        };
      case RoutesActionType.ADD_ROUTE:
        if (addresses.length - routes.length > 1)
          return { ...state, routes: [...state.routes, action.payload] };
        break;
    }
    return state;
  },
);

export const routesReducer: Reducer<Routes, RoutesAction> = combineReducers({
  loading: loadingReducer(RoutesActionType.SET_LOADING),
  addressList: simpleReducer<SetAddressListAction>(RoutesActionType.SET_ADDRESS_LIST, []),
  currentRoute: currentRouteReducer,
});
