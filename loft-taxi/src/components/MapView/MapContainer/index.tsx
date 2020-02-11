import mapboxgl, { GeoJSONSource, LngLat, LngLatBounds } from 'mapbox-gl';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'shared/api';
import { getCurrentRouteRoutes } from 'store/selectors';
import './style.scss';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWxsaXN0YSIsImEiOiJjazV0b3ZteTAwbmJ6M3Bsb3F2Z2E0aDJmIn0.yYwBFVTaGGVH0NG7g95m6g';
const defaultStyle = 'mapbox://styles/mapbox/streets-v11';

const routeLayerId = 'loft-taxi-route';
const routeLocationsLayerId = 'loft-taxi-route-locations';

export interface MapContainerProps {
  style?: string;
}

const initLayers = (map: mapboxgl.Map) => {
  console.log('Initializing map layers');
  map.addLayer({
    id: routeLayerId,
    type: 'line',
    source: {
      type: 'geojson',
      lineMetrics: true,
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [],
        },
      },
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#ffc617',
      'line-width': 8,
      'line-gradient': [
        'interpolate',
        ['linear'],
        ['line-progress'],
        0,
        'blue',
        0.1,
        'royalblue',
        0.3,
        'cyan',
        0.5,
        'lime',
        0.7,
        'yellow',
        1,
        'red',
      ],
    },
  });
  map.addLayer({
    id: routeLocationsLayerId,
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [],
        },
      },
    },
    paint: {
      'circle-color': '#1774ff',
      'circle-radius': 10,
    },
  });
};

const drawRoutes = (map: mapboxgl.Map, routes: Route[]) => {
  if (routes.length === 0 || !map.getSource(routeLayerId) || !map.getSource(routeLocationsLayerId))
    return;
  let completeRoute: Route = [];
  const locations: Route = [];
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    completeRoute = completeRoute.concat(route);
    locations.push(route[0]);
    if (i === routes.length - 1 && route.length > 1) locations.push(route[route.length - 1]);
  }
  (map.getSource(routeLayerId) as GeoJSONSource).setData({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: completeRoute,
    },
  });
  (map.getSource(routeLocationsLayerId) as GeoJSONSource).setData({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: locations,
    },
  });
  var bounds = completeRoute.reduce(
    (bounds, coord) => bounds.extend(new LngLat(...coord)),
    new LngLatBounds(completeRoute[0], completeRoute[0]),
  );
  map.fitBounds(bounds, { padding: 20 });
};

export const MapContainer: FC<MapContainerProps> = ({ style = defaultStyle }) => {
  const routes = useSelector(getCurrentRouteRoutes);
  const [mapIsReady, setMapIsReady] = useState(false);
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
    map.on('load', () => {
      initLayers(map);
      setMapIsReady(true);
    });
    map.on('move', e => {
      setCoords({ center: e.lngLat, zoom: e.zoom });
    });
    mapBox.current = map;
    return () => {
      if (mapBox.current) {
        mapBox.current.remove();
        mapBox.current = undefined;
      }
    };
  }, [style, setMapIsReady]);
  useEffect(() => {
    if (mapBox.current && mapIsReady) drawRoutes(mapBox.current, routes);
  }, [routes, mapIsReady]);
  return <div className="loft-taxi-map-container" ref={mapContainerRef} />;
};
