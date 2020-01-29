import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form, { FormRow, FormInputGroup, FormSep } from '.';

const formTitle = 'Test Form';
const formHeader = 'Form Header';
const formSubmit = 'Submit';
const formRowSuffix = 'suffix';
const formInputId = 'input1';
const formInputLabel = 'Text Input';
const formInputValue = 'input value';
const inputs = [
  <FormRow key={0}>
    <FormInputGroup>
      <label htmlFor={formInputId}>{formInputLabel}</label>
      <input type="text" id={formInputId} defaultValue={formInputValue} />
    </FormInputGroup>
    <FormSep />
    {formRowSuffix}
  </FormRow>,
];

describe('Form', () => {
  it('renders correctly', () => {
    const onSubmit = jest.fn();
    const { queryByText, queryByLabelText } = render(
      <Form onSubmit={onSubmit}>
        {{ title: formTitle, header: formHeader, submit: formSubmit, inputs }}
      </Form>,
    );
    expect(queryByText(formTitle)).toBeTruthy();
    expect(queryByText(formHeader)).toBeTruthy();
    expect(queryByText(formSubmit)).toBeTruthy();
    expect(queryByLabelText(formInputLabel)).toHaveValue(formInputValue);
  });
  describe('when submit button is clicked', () => {
    it('submit callback is invoked', () => {
      const onSubmit = jest.fn();
      const { queryByText } = render(
        <Form onSubmit={onSubmit}>
          {{ title: formTitle, header: formHeader, submit: formSubmit, inputs: [] }}
        </Form>,
      );
      fireEvent.click(queryByText(formSubmit) as HTMLElement);
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
