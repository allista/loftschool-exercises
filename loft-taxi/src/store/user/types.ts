import { PersistPartial } from 'redux-persist/lib/persistReducer';
import { CardData } from 'shared/api';

export type CardInfo = CardData | null;

export type AuthToken = string | null;

export type User = {
  loading: number;
  token: AuthToken;
  card: CardInfo;
} & PersistPartial;
