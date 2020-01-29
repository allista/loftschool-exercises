import React, { FC, useCallback } from 'react';
import { Form, FormRow, FormInputGroup, Button, FormSep } from 'shared';
import './style.scss';

export interface InputProps {
  id: string;
  value: string;
}

export interface OrderFormProps {
  source: InputProps;
  destinations: InputProps[];
  selectedInputId: string;
  addDestination: () => void;
  rmDestination: (id: string) => void;
  selectInput: (id: string) => void;
  centerOn?: (feature: string) => void;
  setInputValue: (id: string, value: string) => void;
}

export const OrderForm: FC<OrderFormProps> = ({
  source,
  destinations,
  selectedInputId,
  addDestination,
  rmDestination,
  selectInput,
  centerOn,
  setInputValue,
}) => {
  const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => selectInput(e.target.id), [
    selectInput,
  ]);
  const clearSource = useCallback(() => setInputValue(source.id, ''), [setInputValue, source.id]);
  const numDst = destinations.length;
  const lastDst = numDst - 1;
  let dstInputs = [];
  for (let i = 0; i < numDst; i++) {
    const { id, value } = destinations[i] || {};
    let grp = [];
    if (i === 0)
      grp.push(
        <label key={id + '-label'} htmlFor={id}>
          Куда
        </label>,
      );
    grp.push(
      <input
        className={id === selectedInputId ? '__selected' : undefined}
        key={id}
        type="text"
        id={id}
        value={value}
        onFocus={onFocus}
      />,
    );
    let row = [
      <FormInputGroup key={id + '-grp'}>{grp}</FormInputGroup>,
      <FormSep key={id + '-sep'} />,
    ];
    if (i < lastDst)
      row.push(
        <FormInputGroup key={id + '-btn'} className="loft-taxi-order-form-button">
          <Button onClick={() => rmDestination(id)}>
            <img src="remove.svg" alt="remove destination" />
          </Button>
        </FormInputGroup>,
      );
    else
      row.push(
        <FormInputGroup key={id + '-btn'} className="loft-taxi-order-form-button">
          <Button onClick={addDestination} disabled={!value}>
            <img src="add.svg" alt="add destination" />
          </Button>
        </FormInputGroup>,
      );
    dstInputs.push(<FormRow key={id + '-row'}>{row}</FormRow>);
  }
  return (
    <div className="loft-taxi-order-form">
      <Form onSubmit={() => {}}>
        {{
          submit: 'Вызвать такси',
          inputs: (
            <>
              <FormRow>
                <FormInputGroup>
                  <label htmlFor={source.id}>Откуда</label>
                  <input
                    className={source.id === selectedInputId ? '__selected' : undefined}
                    type="text"
                    id={source.id}
                    value={source.value}
                    onFocus={onFocus}
                    // onChange={e => setLoginName(e.target.value)}
                  />
                </FormInputGroup>
                <FormInputGroup className="loft-taxi-order-form-button">
                  <Button onClick={clearSource}>
                    <img src="remove.svg" alt="clear" />
                  </Button>
                </FormInputGroup>
                <FormSep />
                <FormInputGroup className="loft-taxi-order-form-button">
                  <Button>
                    <img src="select.svg" alt="select destination" />
                  </Button>
                </FormInputGroup>
              </FormRow>
              {dstInputs}
            </>
          ),
        }}
      </Form>
    </div>
  );
};

export default OrderForm;
