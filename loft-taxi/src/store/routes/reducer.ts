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

const currentRouteReducer: Reducer<CurrentRoute, CurrentRouteAction> = persistReducer(
  {
    key: 'loft-taxi-currentRoute',
    blacklist: ['routes'],
    storage,
  },
  (state, action) => {
    if (state === undefined) return { addresses: [], routes: [] };
    switch (action.type) {
      case RoutesActionType.SELECT_ADDRESS:
        const [addressKey, idx1] = action.payload;
        if (idx1 < 0) return { ...state, addresses: [...state.addresses, addressKey] };
        if (idx1 < state.addresses.length) {
          const newAddresses = state.addresses.slice();
          newAddresses[idx1] = addressKey;
          return { ...state, addresses: newAddresses, routes: state.routes.slice(0, idx1) };
        }
        break;
      case RoutesActionType.REMOVE_ADDRESS:
        const idx2 = action.payload;
        return {
          ...state,
          addresses: state.addresses.slice(0, idx2),
          routes: state.routes.slice(0, idx2),
        };
      case RoutesActionType.ADD_ROUTE:
        if (state.addresses.length - state.routes.length > 1)
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
