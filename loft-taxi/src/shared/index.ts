import { PageID, PageVisibility, PageMap } from './types';

export * from './types';
export * from './contexts';
export * from './Button';
export * from './Form';

export const pages = [
  { id: PageID.LOGIN, title: 'Войти', visibility: PageVisibility.GUEST },
  { id: PageID.REGISTRATION, title: 'Регистрация', visibility: PageVisibility.GUEST },
  { id: PageID.MAP, title: 'Карта', visibility: PageVisibility.USER },
  { id: PageID.PROFILE, title: 'Профиль', visibility: PageVisibility.USER },
];

export const pageMap: PageMap = pages.reduce<PageMap>(
  (map, page) => ({ ...map, [page.id]: page }),
  {} as PageMap,
);

export const pageIsSelectable = (loggedIn: boolean, pageID: PageID): boolean => {
  const { visibility } = pageMap[pageID];
  return (
    (loggedIn && (visibility & PageVisibility.USER) !== 0) ||
    (!loggedIn && (visibility & PageVisibility.GUEST) !== 0)
  );
};
