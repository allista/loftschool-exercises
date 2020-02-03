import { LoginData, RegisterData, CardData } from 'shared/api';
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

// direct store affecting actions
export type SetLoadingAction = Action<UserActionType.SET_LOADING, boolean>;
export type SetTokenAction = Action<UserActionType.SET_TOKEN, AuthToken>;
export type SetCardInfoAction = Action<UserActionType.SET_CARD_INFO, CardInfo>;
export type UserAction = SetTokenAction | SetCardInfoAction;

// saga-only actions that are passed through the store without effect
export type RegisterAction = Action<UserActionType.REGISTER, RegisterData>;
export type LoginAction = Action<UserActionType.LOGIN, LoginData>;
export type LogoutAction = Action<UserActionType.LOGOUT, null>;
export type CardGetAction = Action<UserActionType.CARD_GET, null>;
export type CardPostAction = Action<UserActionType.CARD_POST, CardData>;

export const setLoading = (loading: boolean): SetLoadingAction =>
  _A(UserActionType.SET_LOADING, loading);
export const setToken = (token: AuthToken): SetTokenAction => _A(UserActionType.SET_TOKEN, token);
export const setCardInfo = (cardInfo: CardInfo): SetCardInfoAction =>
  _A(UserActionType.SET_CARD_INFO, cardInfo);
export const register = (data: RegisterData): RegisterAction => _A(UserActionType.REGISTER, data);
export const login = (data: LoginData): LoginAction => _A(UserActionType.LOGIN, data);
export const logout = (): LogoutAction => _A(UserActionType.LOGOUT, null);
export const getCard = (): CardGetAction => _A(UserActionType.CARD_GET, null);
export const postCard = (data: CardData): CardPostAction => _A(UserActionType.CARD_POST, data);
