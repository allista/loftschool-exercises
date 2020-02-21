import Header from 'components/Header';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { PageID } from 'shared';
import { fetchAddressList, fetchNextRoute } from 'store/routes';
import { getAddressList, getCardInfo, getRoutesToUpdate } from 'store/selectors';
import { getCard } from 'store/user';
import { OrderManager } from './OrderManager';
import { ProfileForm } from './ProfileForm';
import './style.scss';
import MapContainer from 'components/MapContainer';

export interface MapViewProps {}

export const MapView: FC<MapViewProps> = () => {
  const dispatch = useDispatch();
  const cardInfo = useSelector(getCardInfo);
  const addressList = useSelector(getAddressList);
  const routesToUpdate = useSelector(getRoutesToUpdate);
  useEffect(() => {
    if (!cardInfo) dispatch(getCard());
  }, [dispatch, cardInfo]);
  useEffect(() => {
    dispatch(fetchAddressList());
  }, [dispatch]);
  useEffect(() => {
    if (routesToUpdate > 0) dispatch(fetchNextRoute());
  }, [routesToUpdate, addressList, dispatch]);
  return (
    <div className="loft-taxi-map">
      <Header />
      <Switch>
        <Route path={PageID.MAP}>
          <OrderManager addressList={addressList} routesToUpdate={routesToUpdate} />
        </Route>
        <Route path={PageID.PROFILE}>
          <ProfileForm />
        </Route>
      </Switch>
      <MapContainer addressList={addressList} />
    </div>
  );
};

export default MapView;
