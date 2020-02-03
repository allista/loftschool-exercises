import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { pageIsSelectable, pages } from 'shared';
import initStore, { AppStore } from 'store';
import { getPageID } from 'store/selectors';
import { setToken } from 'store/user';
import Header from '.';

const token = 'sadfq984rqm-dx17nm43c';

const renderHeader = (loggedIn: boolean, store: AppStore) => {
  if (loggedIn) store.dispatch(setToken(token));
  return render(
    <Provider store={store}>
      <Header />
    </Provider>,
  );
};

const testPages = (loggedIn: boolean, store: AppStore) => {
  const { queryByText } = renderHeader(loggedIn, store);
  pages.forEach(p => {
    if (pageIsSelectable(loggedIn, p.id)) expect(queryByText(p.title)).toBeTruthy();
    else expect(queryByText(p.title)).not.toBeTruthy();
  });
};

describe('Header', () => {
  it('renders correctly', () => {
    const store = initStore();
    renderHeader(false, store);
  });
  describe('when the user is NOT logged in', () => {
    it('renders page buttons vissible to GUESTs', () => {
      const store = initStore();
      testPages(false, store);
    });
  });
  describe('and the user IS logged in', () => {
    it('renders page buttons vissible to USERs', () => {
      const store = initStore();
      testPages(true, store);
    });
  });
  describe('when page button is clicked', () => {
    it('the selectPage callback is invoked with corresponding PageID', () => {
      const store = initStore();
      const { queryByText } = renderHeader(false, store);
      pages.forEach(p => {
        if (pageIsSelectable(false, p.id)) {
          fireEvent.click(queryByText(p.title) as HTMLElement);
          expect(getPageID(store.getState())).toBe(p.id);
        }
      });
    });
  });
});
