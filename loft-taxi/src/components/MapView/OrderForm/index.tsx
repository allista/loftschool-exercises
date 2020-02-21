import React, { FC } from 'react';
import Select, { ValueType } from 'react-select';
import { Button, Form, FormInputGroup, FormRow } from 'shared';
import { AddressKey, Addresses } from 'shared/api';
import './style.scss';

export interface AddressOption {
  value: AddressKey;
  label: string;
}

export interface OrderFormProps {
  addressList: Addresses;
  addresses: AddressKey[];
  routesLoaded: number;
  addDestination: () => void;
  rmDestination: (id: number) => void;
  setInputValue: (id: number, value: AddressKey) => void;
}

export const OrderForm: FC<OrderFormProps> = ({
  addressList,
  addresses,
  routesLoaded,
  addDestination,
  rmDestination,
  setInputValue,
}) => {
  const addressOption = (key: AddressKey) =>
    key === undefined ? null : { value: key, label: addressList[key] };
  const addressOptions = addressList.map((a, i) => ({ value: i, label: a }));
  const addressFilter = (id: number) => (option: AddressOption) =>
    option.value !== undefined &&
    addresses[id - 1] !== option.value &&
    option.value !== addresses[id + 1];
  const onChange = (id: number) => (value: ValueType<AddressOption>) => {
    if (value === null) rmDestination(id);
    else if (value !== undefined && !Array.isArray(value))
      setInputValue(id, (value as AddressOption).value);
  };
  const numAddresses = addresses.length;
  const lastDst = numAddresses - 1;
  let dstInputs = [];
  for (let i = 1; i < numAddresses; i++) {
    const value = addresses[i];
    let grp = [];
    if (i === 1)
      grp.push(
        <label key={i + 'lbl'} htmlFor={i.toString()}>
          Куда
        </label>,
      );
    grp.push(
      <Select<AddressOption>
        placeholder="Выберите пункт назначения"
        classNamePrefix="loft-taxi-order-form-destination-selector"
        key={i}
        inputId={i.toString()}
        value={addressOption(value)}
        options={addressOptions.filter(addressFilter(i))}
        onChange={onChange(i)}
        isClearable={lastDst > 1}
        isLoading={value !== undefined && i > routesLoaded}
      />,
    );
    dstInputs.push(
      <FormRow key={i + '-row'}>
        <FormInputGroup key={i + '-grp'}>{grp}</FormInputGroup>
      </FormRow>,
    );
    if (i === lastDst && value !== undefined)
      dstInputs.push(
        <FormRow key={i + 1}>
          <Button onClick={addDestination} className="loft-taxi-order-form-add-destination-button">
            <img src="add.svg" alt="add destination" />
            добавить пункт назначения
          </Button>
        </FormRow>,
      );
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
                  <label htmlFor="0">Откуда</label>
                  <Select<AddressOption>
                    placeholder="Выбериту пункт отправления"
                    classNamePrefix="loft-taxi-order-form-destination-selector"
                    inputId="0"
                    value={addressOption(addresses[0])}
                    options={addressOptions.filter(addressFilter(0))}
                    onChange={onChange(0)}
                  />
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
