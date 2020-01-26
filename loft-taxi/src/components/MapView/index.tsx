import React, { FC } from 'react';
import Header from 'components/Header';
import OrderManager from './OrderManager';
import './style.scss';

export interface MapViewProps {}

export const MapView: FC<MapViewProps> = () => {
  return (
    <div className="loft-taxi-map">
      <Header />
      <OrderManager />
    </div>
  );
};

export default MapView;
