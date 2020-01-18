export * from './Button';

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
