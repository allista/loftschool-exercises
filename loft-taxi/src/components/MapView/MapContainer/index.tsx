import geojson from 'geojson';
import mapboxgl, { GeoJSONSource, LngLat, LngLatBounds } from 'mapbox-gl';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Addresses, Route } from 'shared/api';
import { getCurrentRoute } from 'store/selectors';
import './style.scss';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWxsaXN0YSIsImEiOiJjazV0b3ZteTAwbmJ6M3Bsb3F2Z2E0aDJmIn0.yYwBFVTaGGVH0NG7g95m6g';
const defaultStyle = 'mapbox://styles/mapbox/streets-v11';

const routeLayerId = 'loft-taxi-route';
const routeLocationsLayerId = 'loft-taxi-route-locations';

export interface MapContainerProps {
  addressList: Addresses;
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
        type: 'FeatureCollection',
        features: [],
      },
    },
    paint: {
      'circle-color': '#1774ff',
      'circle-radius': 10,
    },
  });
};

const drawRoutes = (map: mapboxgl.Map, routes: Route[], addresses: Addresses) => {
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
    type: 'FeatureCollection',
    features: locations.map((l, i) => ({
      type: 'Feature',
      properties: {
        description: addresses[i],
      },
      geometry: {
        type: 'Point',
        coordinates: l,
      },
    })),
  });
  var bounds = completeRoute.reduce(
    (bounds, coord) => bounds.extend(new LngLat(...coord)),
    new LngLatBounds(completeRoute[0], completeRoute[0]),
  );
  map.fitBounds(bounds, { padding: 20 });
};

export const MapContainer: FC<MapContainerProps> = ({ addressList, style = defaultStyle }) => {
  const { routes, addresses } = useSelector(getCurrentRoute);
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
    // create address popup
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });
    map.on('mouseenter', routeLocationsLayerId, e => {
      if (!e.features) return;
      const f = e.features[0];
      if (!f) return;
      if (!f.geometry || !f.properties || Array.isArray(f.geometry)) return;
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';
      var coordinates = (f.geometry as geojson.Point).coordinates.slice();
      var description = f.properties.description;
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      // Populate the popup and set its coordinates
      // based on the feature found.
      popup
        .setLngLat(new LngLat(coordinates[0], coordinates[1]))
        .setHTML(description)
        .addTo(map);
    });
    map.on('mouseleave', routeLocationsLayerId, function() {
      map.getCanvas().style.cursor = '';
      popup.remove();
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
    if (mapBox.current && mapIsReady)
      drawRoutes(
        mapBox.current,
        routes,
        addresses.map(a => (a !== undefined ? addressList[a] : '')),
      );
  }, [routes, addresses, addressList, mapIsReady]);
  return <div className="loft-taxi-map-container" ref={mapContainerRef} />;
};
