import Header from 'components/Header';
import { MapContainer } from './MapContainer';
import { Switch, Route } from 'react-router-dom';
import React, { FC, useEffect } from 'react';
import { PageID } from 'shared';
import { fetchAddressList, fetchNextRoute } from 'store/routes';
import { getAddressList, getCardInfo, getRoutesToUpdate } from 'store/selectors';
import { OrderManager } from './OrderManager';
import { ProfileForm } from './ProfileForm';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getCard } from 'store/user';

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
          <OrderManager addressList={addressList} />
        </Route>
        <Route path={PageID.PROFILE}>
          <ProfileForm />
        </Route>
      </Switch>
      <MapContainer />
    </div>
  );
};

export default MapView;
