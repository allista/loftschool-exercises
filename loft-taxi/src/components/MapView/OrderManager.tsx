import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddressKey, Addresses } from 'shared/api';
import { removeAddress, selectAddress } from 'store/routes';
import { getCurrentRouteAddresses, isCardFilled, isUserLoading } from 'store/selectors';
import OrderForm from './OrderForm';

export interface OrderManagerProps {
  addressList: Addresses;
  routesToUpdate: number;
}

export const OrderManager: FC<OrderManagerProps> = ({ addressList, routesToUpdate }) => {
  const dispatch = useDispatch();
  const addresses = useSelector(getCurrentRouteAddresses);
  const isLoading = useSelector(isUserLoading);
  const cardIsFilled = useSelector(isCardFilled);
  const addDestination = useCallback(() => {
    dispatch(selectAddress(undefined));
  }, [dispatch]);
  const rmDestination = useCallback(
    (id: number) => {
      dispatch(removeAddress(id));
    },
    [dispatch],
  );
  const setInputValue = useCallback(
    (id: number, value: AddressKey) => {
      dispatch(selectAddress(value, id));
    },
    [dispatch],
  );
  useEffect(() => {
    if (addresses.length < 2) dispatch(selectAddress(undefined));
  }, [dispatch, addresses]);
  if (isLoading)
    return (
      <div className="loft-taxi-order-form-unavailable">
        <h2>Загрузка данных с сервера...</h2>
      </div>
    );
  if (cardIsFilled)
    return (
      <OrderForm
        addressList={addressList}
        addresses={addresses}
        routesLoaded={addresses.length - routesToUpdate - 1}
        addDestination={addDestination}
        rmDestination={rmDestination}
        setInputValue={setInputValue}
      />
    );
  return (
    <div className="loft-taxi-order-form-unavailable">
      <h2>Чтобы сделать заказ, необходимо заполнить профиль</h2>
    </div>
  );
};
