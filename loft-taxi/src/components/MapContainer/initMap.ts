import mapboxgl from 'mapbox-gl';
import { config } from 'shared';

mapboxgl.accessToken = config.mapboxToken;

export const routeLayerId = 'loft-taxi-route';
export const routeLocationsLayerId = 'loft-taxi-route-locations';

export const initLayers = (map: mapboxgl.Map) => {
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
