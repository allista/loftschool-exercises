import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { PageID } from 'shared';
import initStore from 'store';
import PageSelector from '.';
jest.mock('../MapView/MapContainer', () => 'div');

describe('PageSelector', () => {
  const pageIds = Object.values(PageID);
  pageIds.forEach(pageID => {
    describe(`with pageID="${pageID}" prop`, () => {
      it('renders this page', () => {
        const store = initStore();
        render(
          <Provider store={store}>
            <PageSelector />
          </Provider>,
        );
      });
    });
  });
});
