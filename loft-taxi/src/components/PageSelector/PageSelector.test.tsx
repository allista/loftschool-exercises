import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { PageID } from 'shared';
import initStore from 'store';
import PageSelector from '.';
import { Router } from 'react-router-dom';
jest.mock('../MapView/MapContainer', () => 'div');

describe('PageSelector', () => {
  const pageIds = Object.values(PageID);
  pageIds.forEach(pageID => {
    describe(`with pageID="${pageID}" prop`, () => {
      it('renders this page', () => {
        const { store } = initStore();
        const history = createMemoryHistory();
        render(
          <Provider store={store}>
            <Router history={history}>
              <PageSelector />
            </Router>
          </Provider>,
        );
      });
    });
  });
});
