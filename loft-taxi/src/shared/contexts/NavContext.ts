import React from 'react';
import { PageID, PageInfo } from '../types';

export interface NavContextProps {
  currentPageID: PageID;
  pages: PageInfo[];
  selectPage: (pageID: PageID) => void;
}

export const NavContext = React.createContext<NavContextProps>({
  currentPageID: PageID.LOGIN,
  pages: [],
  selectPage: () => {},
});
