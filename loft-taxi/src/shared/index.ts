export * from './Button';

export const title = 'Loft Taxi';

export enum PageID {
  LOGIN = 'login',
  PROFILE = 'profile',
  MAP = 'map',
  REGISTRATION = 'registration',
}

export type PageInfo = {
  id: PageID;
  title: string;
};

export const pageTitles = {
  [PageID.LOGIN]: 'Войти',
  [PageID.PROFILE]: 'Профиль',
  [PageID.MAP]: 'Карта',
  [PageID.REGISTRATION]: 'Зарегистрироваться',
};
