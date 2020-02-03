import { userReducer } from './reducer';
import { setToken, setCardInfo } from './actions';
import { CardData } from 'shared/api';

const token = 'asoiuyq32-5y1u51-kf57';
const cardInfo: CardData = {
  cardNumber: '1234 5683 3456 9876',
  expiryDate: '09/32',
  cardName: 'John Smith',
  cvc: '876',
};

describe('User reducer', () => {
  it('returns default state', () => {
    expect(userReducer(undefined, setToken(null))).toEqual({
      loading: 0,
      token: null,
      card: null,
    });
  });
  describe('when a token is updated', () => {
    it('it is present in the state', () => {
      const state = userReducer(undefined, setToken(null));
      const newState = userReducer(state, setToken(token));
      expect(newState.token).toEqual(token);
    });
  });
  describe('when a card info is updated', () => {
    it('it is present in the state', () => {
      const state = userReducer(undefined, setToken(null));
      const newState = userReducer(state, setCardInfo(cardInfo));
      expect(newState.card).toEqual(cardInfo);
    });
  });
});
