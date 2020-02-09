export type ResultBase = {
  success: boolean;
};

export type ResultSuccess = {
  success: true;
};

export interface ResultFailure extends ResultBase {
  success: false;
  error: string;
}

export interface AuthResultSuccess extends ResultSuccess {
  token: string;
}

export type AuthResult = AuthResultSuccess | ResultFailure;
export type CardPostResult = ResultSuccess | ResultFailure;

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  name: string;
  surname: string;
};

export type CardData = {
  cardNumber: string;
  expiryDate: string;
  cardName: string;
  cvc: string;
};

export interface CardPostData extends CardData {
  token: string | null;
}
