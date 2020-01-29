import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '.';

const testButtonText = 'Test Button';
const testButtonId = 'testButton';

describe('Button', () => {
  it('renders correctly', () => {
    const { queryByText } = render(<Button>{testButtonText}</Button>);
    expect(queryByText(testButtonText)).toBeTruthy();
  });
  describe('when enabled', () => {
    it('is clickable', () => {
      const onClick = jest.fn();
      const { queryByText } = render(<Button onClick={onClick}>{testButtonText}</Button>);
      fireEvent.click(queryByText(testButtonText) as HTMLElement);
      expect(onClick).toHaveBeenCalled();
    });
  });
  describe('when disabled', () => {
    it('is not clickable', () => {
      const onClick = jest.fn();
      const { queryByText } = render(
        <Button onClick={onClick} disabled={true}>
          {testButtonText}
        </Button>,
      );
      fireEvent.click(queryByText(testButtonText) as HTMLElement);
      expect(onClick).not.toHaveBeenCalled();
    });
  });
  describe('when passed custom CSS class', () => {
    it('has it in classList as the last entry', () => {
      const className = 'test-css-class';
      const { getByTestId } = render(
        <Button data-testid={testButtonId} className={className} disabled={true}>
          {testButtonText}
        </Button>,
      );
      const testButton = getByTestId(testButtonId);
      expect(testButton).toBeTruthy();
      const buttonClasses = (testButton as HTMLElement).classList;
      expect(buttonClasses[buttonClasses.length - 1]).toBe(className);
    });
  });
});
