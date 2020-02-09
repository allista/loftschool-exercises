import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './index';

const inputLabel = 'Label';
const inputValue = 'Input value';

describe('Input', () => {
  describe('when children are given', () => {
    it('they are rendered as the label', () => {
      const { queryByLabelText } = render(
        <Input value={inputValue} readOnly>
          {inputLabel}
        </Input>,
      );
      expect(queryByLabelText(inputLabel)).toHaveValue(inputValue);
    });
  });
  describe('when the input is required', () => {
    it('the label has asterix appended', () => {
      const { queryByText } = render(<Input required>{inputLabel}</Input>);
      expect(queryByText('*')).toBeTruthy();
    });
  });
  describe('when input is not empty and the onClear handler provided', () => {
    it('the clear button is rendered and clickable', () => {
      const onClear = jest.fn();
      const { getByAltText } = render(
        <Input value={inputValue} readOnly onClear={onClear}>
          {inputLabel}
        </Input>,
      );
      fireEvent.click(getByAltText('clear'));
      expect(onClear).toBeCalled();
    });
  });
});
