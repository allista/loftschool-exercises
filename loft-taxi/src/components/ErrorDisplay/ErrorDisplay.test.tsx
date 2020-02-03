import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ErrorDisplay from './index';
import initStore from 'store';
import { Provider } from 'react-redux';
import { ErrorItem, addError } from 'store/errors';

const error: ErrorItem = {
  message: 'Error message',
  content: ['Some content', 'Some other content'],
};

describe('ErrorDisplay', () => {
  describe('when no errors are present', () => {
    it('renders nothing', () => {
      const store = initStore();
      const { container } = render(
        <Provider store={store}>
          <ErrorDisplay />
        </Provider>,
      );
      expect(container.childElementCount).toBe(1);
      expect(container.children[0].childElementCount).toBe(0);
    });
  });
  describe('when an error is present', () => {
    it('renders the error', () => {
      const store = initStore();
      store.dispatch(addError(error));
      const { queryByText } = render(
        <Provider store={store}>
          <ErrorDisplay />
        </Provider>,
      );
      expect(queryByText(error.message)).toBeTruthy();
      error.content?.forEach(c => {
        expect(queryByText(c)).toBeTruthy();
      });
    });
  });
  describe('when an error card is clicked', () => {
    it('the error is removed and not displayed anymore', () => {
      const store = initStore();
      store.dispatch(addError(error));
      const { queryByText } = render(
        <Provider store={store}>
          <ErrorDisplay />
        </Provider>,
      );
      fireEvent.click(queryByText(error.message) as HTMLElement);
      expect(queryByText(error.message)).not.toBeTruthy();
    });
  });
});
