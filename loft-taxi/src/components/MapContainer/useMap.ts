import geojson from 'geojson';
import mapboxgl, { LngLat } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { initLayers, routeLocationsLayerId } from './initMap';

export const useMap = (style: string) => {
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
      style: style,
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
    const popup = new mapboxgl.Popup({
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
      const coordinates = (f.geometry as geojson.Point).coordinates.slice();
      const description = f.properties.description;
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
  return { mapBox, mapContainerRef, mapIsReady };
};
