import { Route, Addresses, AddressKey } from 'shared/api';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

export type CurrentRoute = {
  addresses: AddressKey[];
  routes: Route[];
} & PersistPartial;

export type Routes = {
  loading: number;
  addressList: Addresses;
  currentRoute: CurrentRoute;
};
