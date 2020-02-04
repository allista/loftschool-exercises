import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { pageIsSelectable, pages } from 'shared';
import initStore, { AppStore } from 'store';
import { setToken } from 'store/user';
import Header from '.';

const token = 'sadfq984rqm-dx17nm43c';

const renderHeader = (loggedIn: boolean, store: AppStore, history: History) => {
  if (loggedIn) store.dispatch(setToken(token));
  return render(
    <Provider store={store}>
      <Router history={history}>
        <Header />
      </Router>
    </Provider>,
  );
};

const testPages = (loggedIn: boolean, store: AppStore, history: History) => {
  const { queryByText } = renderHeader(loggedIn, store, history);
  pages.forEach(p => {
    if (pageIsSelectable(loggedIn, p.id)) expect(queryByText(p.title)).toBeTruthy();
    else expect(queryByText(p.title)).not.toBeTruthy();
  });
};

describe('Header', () => {
  it('renders correctly', () => {
    const store = initStore();
    const history = createMemoryHistory();
    renderHeader(false, store, history);
  });
  describe('when the user is NOT logged in', () => {
    it('renders page buttons vissible to GUESTs', () => {
      const store = initStore();
      const history = createMemoryHistory();
      testPages(false, store, history);
    });
  });
  describe('when the user IS logged in', () => {
    it('renders page buttons vissible to USERs', () => {
      const store = initStore();
      const history = createMemoryHistory();
      testPages(true, store, history);
    });
  });
  describe('when page button is clicked', () => {
    it('the selectPage callback is invoked with corresponding PageID', () => {
      const store = initStore();
      const history = createMemoryHistory();
      const { queryByText } = renderHeader(false, store, history);
      pages.forEach(p => {
        if (pageIsSelectable(false, p.id)) {
          fireEvent.click(queryByText(p.title) as HTMLElement);
          expect(history.location.pathname).toBe(p.id);
        }
      });
    });
  });
});
