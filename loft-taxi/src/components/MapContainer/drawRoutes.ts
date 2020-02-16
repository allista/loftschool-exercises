import mapboxgl, { GeoJSONSource, LngLat, LngLatBounds } from 'mapbox-gl';
import { Addresses, Route } from 'shared/api';
import { routeLayerId, routeLocationsLayerId } from './initMap';

export const drawRoutes = (map: mapboxgl.Map, routes: Route[], addresses: Addresses) => {
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
  const bounds = completeRoute.reduce(
    (bounds, coord) => bounds.extend(new LngLat(...coord)),
    new LngLatBounds(completeRoute[0], completeRoute[0]),
  );
  map.fitBounds(bounds, { padding: 20 });
};
