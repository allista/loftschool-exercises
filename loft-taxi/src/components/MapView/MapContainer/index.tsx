import React, { FC, useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './style.scss';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWxsaXN0YSIsImEiOiJjazV0b3ZteTAwbmJ6M3Bsb3F2Z2E0aDJmIn0.yYwBFVTaGGVH0NG7g95m6g';
const defaultStyle = 'mapbox://styles/mapbox/streets-v11';

export interface MapContainerProps {
  style?: string;
}

export const MapContainer: FC<MapContainerProps> = ({ style = defaultStyle }) => {
  const [coords, setCoords] = useState({ center: { lng: 0, lat: 0 }, zoom: 1 });
  const coordsRef = useRef(coords);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapBox = useRef<mapboxgl.Map>();
  useEffect(() => {
    if (!mapContainerRef.current) return;
    console.log('Initializing map');
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: style || defaultStyle,
      center: coordsRef.current.center,
      zoom: coordsRef.current.zoom,
    });
    mapBox.current = map;
    map.on('move', e => {
      setCoords({ center: e.lngLat, zoom: e.zoom });
    });
    return () => {
      if (mapBox.current) {
        mapBox.current.remove();
        mapBox.current = undefined;
      }
    };
  }, [style, onClick]);
  return <div className="loft-taxi-map-container" ref={mapContainerRef} />;
};
