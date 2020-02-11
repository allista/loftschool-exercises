import { createSelector } from 'reselect';
import { AppState } from 'store/types';

export const getErrors = (state: AppState) => state.errors;

export const getUser = (state: AppState) => state.user;
export const isUserLoading = createSelector(getUser, user => user.loading > 0);
export const getToken = createSelector(getUser, user => user.token);
export const getCardInfo = createSelector(getUser, user => user.card);
export const isLoggedIn = createSelector(getToken, token => token !== null);
export const isCardFilled = createSelector(
  getCardInfo,
  card => card && card.cardName && card.cardNumber && card.expiryDate && card.cvc,
);

export const getRoutes = (state: AppState) => state.routes;
export const isRoutesLoading = createSelector(getRoutes, routes => routes.loading > 0);
export const getAddressList = createSelector(getRoutes, routes => routes.addressList);
export const getCurrentRoute = createSelector(getRoutes, routes => routes.currentRoute);
export const getCurrentRouteAddresses = createSelector(
  getCurrentRoute,
  currentRoute => currentRoute.addresses,
);
export const getCurrentRouteRoutes = createSelector(
  getCurrentRoute,
  currentRoute => currentRoute.routes,
);
export const getRoutesToUpdate = createSelector(
  getCurrentRoute,
  currentRoute => currentRoute.addresses.length - currentRoute.routes.length - 1,
);
