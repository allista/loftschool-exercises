import { Addresses, AddressKey, Route } from 'shared/api';
import { _A } from 'store/common';
import { Action } from 'store/types';

export enum RoutesActionType {
  SET_LOADING = 'ROUTES_SET_LOADING',
  FETCH_ADDRESS_LIST = 'FETCH_ADDRESS_LIST',
  SET_ADDRESS_LIST = 'SET_ADDRESS_LIST',
  SELECT_ADDRESS = 'SELECT_ADDRESS',
  REMOVE_ADDRESS = 'REMOVE_ADDRESS',
  FETCH_NEXT_ROUTE = 'FETCH_NEXT_ROUTE',
  ADD_ROUTE = 'ADD_ROUTE',
  RESET_CURRENT_ROUTE = 'RESET_CURRENT_ROUTE',
}

export type SetLoadingAction = Action<RoutesActionType.SET_LOADING, boolean>;

export type GetAddressListAction = Action<RoutesActionType.FETCH_ADDRESS_LIST, null>;
export type SetAddressListAction = Action<RoutesActionType.SET_ADDRESS_LIST, Addresses>;

export type SelectAddressAction = Action<RoutesActionType.SELECT_ADDRESS, [AddressKey, number]>;
export type RemoveAddressAction = Action<RoutesActionType.REMOVE_ADDRESS, number>;
export type AddRouteAction = Action<RoutesActionType.ADD_ROUTE, Route>;
export type FetchNextRouteAction = Action<RoutesActionType.FETCH_NEXT_ROUTE, null>;
export type ResetCurrentRouteAction = Action<RoutesActionType.RESET_CURRENT_ROUTE, null>;

export type CurrentRouteAction =
  | SelectAddressAction
  | RemoveAddressAction
  | AddRouteAction
  | ResetCurrentRouteAction;

export type RoutesAction =
  | SetLoadingAction
  | GetAddressListAction
  | SetAddressListAction
  | CurrentRouteAction;

export const setLoading = (loading: boolean): SetLoadingAction =>
  _A(RoutesActionType.SET_LOADING, loading);

export const fetchAddressList = (): GetAddressListAction =>
  _A(RoutesActionType.FETCH_ADDRESS_LIST, null);

export const setAddressList = (addresses: Addresses): SetAddressListAction =>
  _A(RoutesActionType.SET_ADDRESS_LIST, addresses);

export const selectAddress = (addressKey: AddressKey, index: number = -1): SelectAddressAction =>
  _A(RoutesActionType.SELECT_ADDRESS, [addressKey, index]);

export const removeAddress = (index: number = -1): RemoveAddressAction =>
  _A(RoutesActionType.REMOVE_ADDRESS, index);

export const addRoute = (route: Route): AddRouteAction => _A(RoutesActionType.ADD_ROUTE, route);

export const fetchNextRoute = (): FetchNextRouteAction =>
  _A(RoutesActionType.FETCH_NEXT_ROUTE, null);

export const resetCurrentRoute = (): ResetCurrentRouteAction =>
  _A(RoutesActionType.RESET_CURRENT_ROUTE, null);
