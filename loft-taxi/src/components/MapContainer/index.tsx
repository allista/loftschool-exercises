import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Addresses } from 'shared/api';
import { getCurrentRoute } from 'store/selectors';
import { drawRoutes } from './drawRoutes';
import { useMap } from './useMap';
import './style.scss';

export const defaultStyle = 'mapbox://styles/mapbox/streets-v11';

export interface MapContainerProps {
  addressList: Addresses;
  style?: string;
}

export const MapContainer: FC<MapContainerProps> = ({ addressList, style = defaultStyle }) => {
  const { routes, addresses } = useSelector(getCurrentRoute);
  const { mapBox, mapContainerRef, mapIsReady } = useMap(style);
  useEffect(() => {
    if (mapBox.current && mapIsReady)
      drawRoutes(
        mapBox.current,
        routes,
        addresses.map(a => (a !== undefined ? addressList[a] : '')),
      );
  }, [routes, addresses, addressList, mapIsReady, mapBox]);
  return <div className="loft-taxi-map-container" ref={mapContainerRef} />;
};

export default MapContainer;
