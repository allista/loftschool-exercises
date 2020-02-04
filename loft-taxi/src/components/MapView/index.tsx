import React, { FC, useRef, useCallback } from 'react';
import Header from 'components/Header';
import { MapContainer } from './MapContainer';
import { OrderManager, OrderManagerAPI } from './OrderManager';
import { Switch, Route } from 'react-router-dom';
import { PageID } from 'shared';
import { ProfileForm } from './ProfileForm';
import './style.scss';

export interface MapViewProps {}

export const MapView: FC<MapViewProps> = () => {
  const orderManagerRef = useRef<OrderManagerAPI | null>(null);
  const onMapClicked = useCallback((mapFeature: string) => {
    if (orderManagerRef.current) orderManagerRef.current.onMapClicked(mapFeature);
  }, []);
  return (
    <div className="loft-taxi-map">
      <Header />
      <Switch>
        <Route path={PageID.MAP}>
          <OrderManager ref={orderManagerRef} />
        </Route>
        <Route path={PageID.PROFILE}>
          <ProfileForm />
        </Route>
      </Switch>
      <MapContainer onClick={onMapClicked} />
    </div>
  );
};

export default MapView;
