import axios from 'axios';
import { config } from 'shared';
import {
  RegisterData,
  AuthResult,
  LoginData,
  CardPostData,
  CardData,
  CardPostResult,
} from './types';

export const _axios = axios.create({
  baseURL: config.backendUrl,
});

export const register = async (payload: RegisterData): Promise<AuthResult | null> => {
  const { data } = await _axios.post('register', payload);
  return data;
};

export const auth = async (payload: LoginData): Promise<AuthResult | null> => {
  const { data } = await _axios.post('auth', payload);
  return data;
};

export const cardGetData = async (token: string | null): Promise<CardData | null> => {
  const { data } = await _axios.get('card', { params: { token } });
  return data;
};

export const cardPostData = async (payload: CardPostData): Promise<CardPostResult | null> => {
  const { data } = await _axios.post('card', payload);
  return data;
};
