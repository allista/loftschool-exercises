import React, {
  useState,
  useReducer,
  useCallback,
  useRef,
  RefForwardingComponent,
  useImperativeHandle,
  forwardRef,
} from 'react';
import OrderForm, { InputProps } from './OrderForm';
import { useSelector } from 'react-redux';
import { isCardFilled, isUserLoading } from 'store/selectors';

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

export interface OrderManagerAPI {
  onMapClicked: (mapFeature: string) => void;
}

const OrderManagerInner: RefForwardingComponent<OrderManagerAPI> = (_, ref) => {
  const isLoading = useSelector(isUserLoading);
  const cardIsFilled = useSelector(isCardFilled);
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
  useImperativeHandle(ref, () => ({
    onMapClicked,
  }));
  if (isLoading) return null;
  if (cardIsFilled)
    return (
      <OrderForm
        source={{ id: sourceId, value: source }}
        destinations={destinations}
        selectedInputId={curInputId}
        addDestination={addDestination}
        rmDestination={rmDestination}
        selectInput={setCurInputId}
        setInputValue={setInputValue}
      />
    );
  return (
    <div className="loft-taxi-order-form-unavailable">
      <h2>Чтобы сделать заказ, необходимо заполнить профиль</h2>
    </div>
  );
};

export const OrderManager = forwardRef(OrderManagerInner);
