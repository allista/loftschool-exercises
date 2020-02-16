import { routesReducer } from './reducer';
import * as actions from './actions';
import { Routes } from './types';
import { Addresses, Route } from 'shared/api';

const addressList: Addresses = ['a', 'b', 'c'];
const routeSample: Route = [
  [1, 2],
  [3, 4],
  [5, 6],
];

describe('Routes reducer', () => {
  let state: Routes;
  let stateWithAddresses: Routes;
  beforeEach(() => {
    state = routesReducer(undefined, actions.setLoading(true));
    stateWithAddresses = routesReducer(state, actions.selectAddress(0));
    stateWithAddresses = routesReducer(stateWithAddresses, actions.selectAddress(1));
  });

  it('returns default state', () => {
    expect(state).toEqual({
      loading: 0,
      addressList: [],
      currentRoute: { addresses: [], routes: [] },
    });
  });
  describe('when a list of addresses is set', () => {
    it('it is present in the state', () => {
      const newState = routesReducer(state, actions.setAddressList(addressList));
      expect(newState.addressList).toEqual(addressList);
    });
  });
  describe('when address is selected', () => {
    describe('without index', () => {
      describe('and it is not the same address as the last one', () => {
        it('it is added to the addresses of the currentRoute', () => {
          let newState = routesReducer(state, actions.selectAddress(0));
          newState = routesReducer(newState, actions.selectAddress(1));
          expect(newState.currentRoute.addresses).toEqual([0, 1]);
        });
      });
      describe('and it IS the same address as the last one', () => {
        it('it is NOT added to the addresses of the currentRoute', () => {
          let newState = routesReducer(state, actions.selectAddress(0));
          newState = routesReducer(newState, actions.selectAddress(0));
          expect(newState.currentRoute.addresses).toEqual([0]);
        });
      });
    });
    describe('with the index in bounds', () => {
      describe('and it is not the same address as the neigboring ones', () => {
        it('it replaces the address at this index in the currentRoute', () => {
          let newState = routesReducer(stateWithAddresses, actions.selectAddress(2, 0));
          expect(newState.currentRoute.addresses).toEqual([2, 1]);
        });
      });
      describe('and it IS the same address as one of the neigboring ones', () => {
        it('the state remains unchanged', () => {
          let newState = routesReducer(stateWithAddresses, actions.selectAddress(1, 0));
          expect(newState).toEqual(stateWithAddresses);
        });
      });
    });
    describe('with the index that is out of bounds', () => {
      it('the state remains unchanged', () => {
        let newState = routesReducer(stateWithAddresses, actions.selectAddress(2, -1));
        newState = routesReducer(stateWithAddresses, actions.selectAddress(2, 2));
        expect(newState).toEqual(stateWithAddresses);
      });
    });
  });
  describe('when the route is added', () => {
    describe('to the empty currentRoute', () => {
      it('the state remains unchanged', () => {
        let newState = routesReducer(state, actions.addRoute(routeSample));
        expect(newState).toEqual(state);
      });
    });
    describe('to the currentRoute with one address', () => {
      it('the state remains unchanged', () => {
        const stateWithAddress = routesReducer(state, actions.selectAddress(0));
        let newState = routesReducer(stateWithAddress, actions.addRoute(routeSample));
        expect(newState).toEqual(stateWithAddress);
      });
    });
    describe('to the currentRoute with two or more address', () => {
      it('it is present in the currentRoute', () => {
        let newState = routesReducer(stateWithAddresses, actions.addRoute(routeSample));
        expect(newState.currentRoute.routes[0]).toEqual(routeSample);
      });
    });
    describe('to the currentRoute that has all the routes', () => {
      it('the state remains unchanged', () => {
        const stateWithFullRoute = routesReducer(stateWithAddresses, actions.addRoute(routeSample));
        let newState = routesReducer(stateWithFullRoute, actions.addRoute(routeSample));
        expect(newState).toEqual(stateWithFullRoute);
      });
    });
  });
  describe('when first address is re-selected', () => {
    it('all the routes are erased in the currentRoute', () => {
      let newState = routesReducer(stateWithAddresses, actions.addRoute(routeSample));
      newState = routesReducer(newState, actions.selectAddress(2, 0));
      expect(newState.currentRoute.routes.length).toEqual(0);
    });
  });
});
