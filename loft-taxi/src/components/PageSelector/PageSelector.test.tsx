import React from 'react';
import { render } from '@testing-library/react';
import { PageID } from 'shared';
jest.mock('../MapView/MapContainer', () => 'div');
import PageSelector from '.';

describe('PageSelector', () => {
  const pageIds = Object.values(PageID);
  pageIds.forEach(pageID => {
    describe(`with pageID="${pageID}" prop`, () => {
      it('renders this page', () => {
        render(<PageSelector pageID={pageID} />);
      });
    });
  });
});
