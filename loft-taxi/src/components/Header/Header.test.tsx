import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from '.';
import {
  UserContext,
  NavContext,
  PageID,
  pageMap,
  pages,
  pageIsSelectable,
  NavContextProps,
} from 'shared';

const defaultPage = PageID.LOGIN;

const renderHeader = (loggedIn: boolean, { pages, selectPage, currentPageID }: NavContextProps) =>
  render(
    <UserContext.Provider value={{ loggedIn, name: null, login: jest.fn(), logout: jest.fn() }}>
      <NavContext.Provider value={{ currentPageID: currentPageID, pages, selectPage }}>
        <Header />
      </NavContext.Provider>
    </UserContext.Provider>,
  );

const testPages = (loggedIn: boolean) => {
  const { queryByText } = renderHeader(loggedIn, {
    currentPageID: defaultPage,
    pages,
    selectPage: jest.fn(),
  });
  pages.forEach(p => {
    if (pageIsSelectable(loggedIn, p.id)) expect(queryByText(p.title)).toBeTruthy();
    else expect(queryByText(p.title)).not.toBeTruthy();
  });
};

describe('Header', () => {
  describe('when no pages provided', () => {
    it('does not render default page button', () => {
      const { queryByText } = renderHeader(false, {
        pages: [],
        selectPage: jest.fn(),
        currentPageID: defaultPage,
      });
      expect(queryByText(pageMap[defaultPage].title)).not.toBeTruthy();
    });
  });
  describe('when pages provided', () => {
    describe('and the user is NOT logged in', () => {
      it('renders page buttons vissible to GUESTs', () => {
        testPages(false);
      });
    });
    describe('and the user IS logged in', () => {
      it('renders page buttons vissible to USERs', () => {
        testPages(true);
      });
    });
  });
  describe('when page button is clicked', () => {
    it('the selectPage callback is invoked with corresponding PageID', () => {
      const selectPage = jest.fn();
      const { queryByText } = renderHeader(false, {
        pages,
        selectPage: selectPage,
        currentPageID: defaultPage,
      });
      pages.forEach(p => {
        if (pageIsSelectable(false, p.id)) {
          fireEvent.click(queryByText(p.title) as HTMLElement);
          expect(selectPage).lastCalledWith(p.id);
        }
      });
    });
  });
});
