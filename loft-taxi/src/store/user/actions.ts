import { LoginData, RegisterData, CardData, AuthResult } from 'shared/api';
import { History } from 'history';
import { _A } from 'store/common';
import { Action } from 'store/types';
import { CardInfo, AuthToken } from './types';

export enum UserActionType {
  SET_LOADING = 'SET_USER_LOADING',
  SET_TOKEN = 'SET_TOKEN',
  SET_CARD_INFO = 'SET_CARD_INFO',
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  AUTH = 'AUTH',
  CARD_GET = 'CARD_GET',
  CARD_POST = 'CARD_POST',
  LOGOUT = 'LOGOUT',
}

export type WithHistory = {
  history: History;
};

// direct store affecting actions
export type SetLoadingAction = Action<UserActionType.SET_LOADING, boolean>;
export type SetTokenAction = Action<UserActionType.SET_TOKEN, AuthToken>;
export type SetCardInfoAction = Action<UserActionType.SET_CARD_INFO, CardInfo>;
export type UserAction = SetTokenAction | SetCardInfoAction;

// saga-only actions that are passed through the store without effect
export type AuthAction = Action<UserActionType.AUTH, AuthResult, WithHistory>;
export type RegisterAction = Action<UserActionType.REGISTER, RegisterData, WithHistory>;
export type LoginAction = Action<UserActionType.LOGIN, LoginData, WithHistory>;
export type LogoutAction = Action<UserActionType.LOGOUT, null, WithHistory>;
export type CardGetAction = Action<UserActionType.CARD_GET, null>;
export type CardPostAction = Action<UserActionType.CARD_POST, CardData>;

export const setLoading = (loading: boolean): SetLoadingAction =>
  _A(UserActionType.SET_LOADING, loading);
export const setToken = (token: AuthToken): SetTokenAction => _A(UserActionType.SET_TOKEN, token);
export const setCardInfo = (cardInfo: CardInfo): SetCardInfoAction =>
  _A(UserActionType.SET_CARD_INFO, cardInfo);
export const register = (data: RegisterData, extra: WithHistory): RegisterAction =>
  _A(UserActionType.REGISTER, data, extra);
export const login = (data: LoginData, extra: WithHistory): LoginAction =>
  _A(UserActionType.LOGIN, data, extra);
export const logout = (history: History): LogoutAction =>
  _A(UserActionType.LOGOUT, null, { history });
export const getCard = (): CardGetAction => _A(UserActionType.CARD_GET, null);
export const postCard = (data: CardData): CardPostAction => _A(UserActionType.CARD_POST, data);
