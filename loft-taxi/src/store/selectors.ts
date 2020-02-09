import { createSelector } from 'reselect';
import { AppState } from 'store/types';

export const getErrors = (state: AppState) => state.errors;
export const getUser = (state: AppState) => state.user;
export const getUserLoading = createSelector(getUser, user => user.loading > 0);
export const getToken = createSelector(getUser, user => user.token);
export const getCardInfo = createSelector(getUser, user => user.card);
export const isLoggedIn = createSelector(getToken, token => token !== null);
