import { _A } from 'store/common';
import { errorReducer } from './reducer';
import { addError, removeError, clearErrors } from '.';

const testError = { message: 'Test error message', content: ['Info 1', 'Info 2'] };

describe('Error reducer', () => {
  it('returns the initial state', () => {
    expect(errorReducer(undefined, clearErrors())).toEqual({});
  });
  describe('when an error is added', () => {
    it('it IS in the state', () => {
      const newState = errorReducer({}, addError(testError));
      expect(Object.values(newState)).toContainEqual(testError);
    });
  });
  describe('when an error is removed', () => {
    it('it is NOT in the state', () => {
      const state = errorReducer({}, addError(testError));
      const newState = errorReducer(state, removeError(Object.keys(state)[0]));
      expect(Object.values(newState)).not.toContainEqual(testError);
    });
  });
  describe('when errors are cleared', () => {
    it('the state is empty', () => {
      const state = errorReducer({}, addError(testError));
      const newState = errorReducer(state, clearErrors());
      expect(Object.values(newState).length).toBe(0);
    });
  });
});
