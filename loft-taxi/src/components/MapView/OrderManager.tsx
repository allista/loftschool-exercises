import React, { FC, useState, useReducer, useCallback, useRef } from 'react';
import OrderForm, { InputProps } from './OrderForm';
import MapContainer from './MapContainer';

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

export const OrderManager: FC = () => {
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
  const onMapClicked = useCallback(
    (mapFeature: string) => setInputValue(curInputIdRef.current, mapFeature),
    [curInputIdRef, setInputValue],
  );
  return (
    <>
      <OrderForm
        source={{ id: sourceId, value: source }}
        destinations={destinations}
        selectedInputId={curInputId}
        addDestination={addDestination}
        rmDestination={rmDestination}
        selectInput={setCurInputId}
        setInputValue={setInputValue}
      />
      <MapContainer onClick={onMapClicked} />
    </>
  );
};

export default OrderManager;
