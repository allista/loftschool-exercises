import React, { FC } from 'react';
import { PageID, pageMap } from '../../shared';
import './style.scss';

export interface MapViewProps {}

export const MapView: FC<MapViewProps> = ({}) => {
  return (
    <div className="loft-taxi-map">
      <div className="loft-taxi-page-title">{pageMap[PageID.MAP].title}</div>
    </div>
  );
};

export default MapView;
