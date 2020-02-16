import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormRow, Button, Input, FormSpace } from 'shared';
import { CardData } from 'shared/api';
import { getCardInfo, isUserLoading } from 'store/selectors';
import { postCard, setCardInfo } from 'store/user';
import './style.scss';

export interface InputProps {
  id: string;
  value: string;
}

export interface ProfileFormProps {}

const emptyCard = {
  cardNumber: '',
  expiryDate: '',
  cardName: '',
  cvc: '',
};

export const ProfileForm: FC<ProfileFormProps> = () => {
  const dispatch = useDispatch();
  const [showCVC, setShowCVC] = useState(false);
  const isLoading = useSelector(isUserLoading);
  const cardData = useSelector(getCardInfo) || emptyCard;
  const updateCardInfo = useCallback(
    (key: keyof CardData, value: CardData[keyof CardData]) =>
      dispatch(
        setCardInfo({
          ...cardData,
          [key]: value,
        }),
      ),
    [cardData, dispatch],
  );
  const sendCardInfo = useCallback(() => dispatch(postCard({ ...cardData })), [dispatch, cardData]);
  return (
    <div className="loft-taxi-profile-form">
      <Form onSubmit={sendCardInfo}>
        {{
          submit: 'Сохранить',
          title: 'Профиль',
          header: 'Способ оплаты',
          inputs: (
            <>
              <FormRow>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 1234 5678"
                  required
                  value={cardData.cardNumber}
                  onChange={e => updateCardInfo('cardNumber', e.target.value)}
                  onClear={() => updateCardInfo('cardNumber', '')}
                >
                  Номер карты
                </Input>
                <FormSpace width="3em">
                  <img
                    className="loft-taxi-profile-card-symbol"
                    src="mc_symbol.svg"
                    alt="card symbol"
                  />
                </FormSpace>
                <Input
                  type="text"
                  id="cardName"
                  placeholder="JHON SMITH"
                  required
                  value={cardData.cardName}
                  onChange={e => updateCardInfo('cardName', e.target.value)}
                  onClear={() => updateCardInfo('cardName', '')}
                >
                  Имя владельца
                </Input>
              </FormRow>
              <FormRow>
                <Input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  required
                  value={cardData.expiryDate}
                  onChange={e => updateCardInfo('expiryDate', e.target.value)}
                  onClear={() => updateCardInfo('expiryDate', '')}
                >
                  Срок действия
                </Input>
                <FormSpace width="3em" />
                <Input
                  type={showCVC ? 'text' : 'password'}
                  id="cvc"
                  placeholder="123"
                  required
                  value={cardData.cvc}
                  onChange={e => updateCardInfo('cvc', e.target.value)}
                  buttons={[
                    {
                      content: (
                        <img src={showCVC ? 'hidden.svg' : 'visible.svg'} alt="show/hide CVC" />
                      ),
                      onClick: () => setShowCVC(!showCVC),
                    },
                  ]}
                >
                  CVC
                </Input>
              </FormRow>
            </>
          ),
        }}
      </Form>
      {isLoading ? <div className="loft-taxi-loading" /> : null}
    </div>
  );
};

export default ProfileForm;
