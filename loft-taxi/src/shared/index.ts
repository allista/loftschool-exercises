import { PageID, PageInfo } from './types';

export * from './types';
export * from './contexts';
export * from './Button';



export const pageTitles = {
  [PageID.LOGIN]: 'Войти',
  [PageID.PROFILE]: 'Профиль',
  [PageID.MAP]: 'Карта',
  [PageID.REGISTRATION]: 'Регистрация',
};
