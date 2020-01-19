import React from 'react';
import { PageID, PageInfo } from '../types';

export interface NavContext {
  currentPageID: PageID;
  pages: PageInfo[];
  selectPage: (pageID: PageID) => void;
}

export const NavContext = React.createContext<NavContext>({
  currentPageID: PageID.LOGIN,
  pages: [],
  selectPage: () => {},
});
