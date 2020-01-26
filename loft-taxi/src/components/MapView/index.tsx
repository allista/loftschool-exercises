import React, { FC, useState, useEffect, useReducer, useCallback, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import OrderForm, { InputProps } from './OrderForm';
import './style.scss';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWxsaXN0YSIsImEiOiJjazV0b3ZteTAwbmJ6M3Bsb3F2Z2E0aDJmIn0.yYwBFVTaGGVH0NG7g95m6g';
const defaultStyle = 'mapbox://styles/mapbox/streets-v11';

export interface MapViewProps {
  style?: string;
}

interface InputAction {
  type: 'ADD' | 'REMOVE' | 'SET';
  payload?: null | string | InputProps;
}

const dstReducer = (state: InputProps[], action: InputAction): InputProps[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: `dst_${state.length}`, value: '' }];
    case 'REMOVE':
      const toRemove = action.payload as string;
      const newState = state.filter(inp => inp.id !== toRemove);
      return newState.map((inp, i) => ({ ...inp, id: `dst_${i}` }));
    case 'SET':
      const { id, value } = action.payload as InputProps;
      return state.map(inp => {
        if (inp.id !== id) return inp;
        return { ...inp, value };
      });
  }
};

const sourceId = 'source';

export const MapView: FC<MapViewProps> = ({ style }) => {
  const [curInputId, setCurInputIdState] = useState(sourceId);
  const curInputIdRef = useRef(curInputId);
  const setCurInputId = useCallback(
    (id: string) => {
      curInputIdRef.current = id;
      setCurInputIdState(id);
    },
    [setCurInputIdState, curInputIdRef],
  );
  const [source, setSource] = useState('');
  const [destinations, dispatchDst] = useReducer(dstReducer, [{ id: 'dst_0', value: '' }]);
  const addDestination = useCallback(() => dispatchDst({ type: 'ADD' }), [dispatchDst]);
  const rmDestination = useCallback((id: string) => dispatchDst({ type: 'REMOVE', payload: id }), [
    dispatchDst,
  ]);
  const setInputValue = useCallback(
    (id: string, value: string) => {
      if (!id || id === sourceId) setSource(value);
      else dispatchDst({ type: 'SET', payload: { id, value } });
    },
    [setSource, dispatchDst],
  );
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapBox = useRef<mapboxgl.Map>();
  useEffect(() => {
    if (!mapContainerRef.current) return;
    console.log('Initializing map');
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: style || defaultStyle,
    });
    mapBox.current = map;
    map.on('click', (e: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent) => {
      const lngLat = `${e.lngLat.lng.toFixed(4)}, ${e.lngLat.lat.toFixed(4)}`;
      setInputValue(curInputIdRef.current, lngLat);
    });
  }, [style, setInputValue]);
  return (
    <div className="loft-taxi-map">
      <OrderForm
        source={{ id: sourceId, value: source }}
        destinations={destinations}
        selectedInputId={curInputId}
        addDestination={addDestination}
        rmDestination={rmDestination}
        selectInput={setCurInputId}
        setInputValue={setInputValue}
      />
      <div className="loft-taxi-map-container" ref={mapContainerRef} />
    </div>
  );
};

export default MapView;
