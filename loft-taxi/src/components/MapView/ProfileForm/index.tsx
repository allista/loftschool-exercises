import React, { FC, useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormRow, FormSpace, Input, inputPropsFromErrors } from 'shared';
import {
  cardNameValidator,
  cardNumberValidator,
  cvcValidator,
  expiryDateValidator,
} from 'shared/validation/card';
import { getCardInfo, isUserLoading } from 'store/selectors';
import { postCard } from 'store/user';
import { CardData } from 'shared/api';
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
  const cardData = useSelector(getCardInfo) || emptyCard;
  const { register, handleSubmit, errors, setValue, triggerValidation, reset } = useForm({
    mode: 'onChange',
    defaultValues: cardData,
  });
  const dispatch = useDispatch();
  const [showCVC, setShowCVC] = useState(false);
  const isLoading = useSelector(isUserLoading);
  const sendCardInfo = useCallback(
    cardData => {
      dispatch(postCard({ ...cardData }));
    },
    [dispatch],
  );
  const resetField = useCallback(
    (name: keyof CardData) => {
      setValue(name, cardData[name]);
      triggerValidation();
    },
    [cardData, setValue, triggerValidation],
  );
  useEffect(() => {
    reset(cardData);
  }, [cardData, reset]);
  return (
    <div className="loft-taxi-profile-form">
      <Form onSubmit={handleSubmit(sendCardInfo)}>
        {{
          submit: 'Сохранить',
          title: 'Профиль',
          header: 'Способ оплаты',
          inputs: (
            <>
              <FormRow>
                <Input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 1234 5678"
                  required
                  width="40%"
                  onClear={() => resetField('cardNumber')}
                  ref={register(cardNumberValidator)}
                  {...inputPropsFromErrors(errors, 'cardNumber')}
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
                  name="cardName"
                  placeholder="JHON SMITH"
                  required
                  width="40%"
                  onClear={() => resetField('cardName')}
                  onChange={e => (e.target.value = e.target.value.toUpperCase())}
                  ref={register(cardNameValidator)}
                  {...inputPropsFromErrors(errors, 'cardName')}
                >
                  Имя владельца
                </Input>
              </FormRow>
              <FormRow>
                <Input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  required
                  width="40%"
                  onClear={() => resetField('expiryDate')}
                  ref={register(expiryDateValidator)}
                  {...inputPropsFromErrors(errors, 'expiryDate')}
                >
                  Срок действия
                </Input>
                <FormSpace width="3em" />
                <Input
                  type={showCVC ? 'text' : 'password'}
                  name="cvc"
                  placeholder="123"
                  required
                  width="40%"
                  onClear={() => resetField('cvc')}
                  ref={register(cvcValidator)}
                  {...inputPropsFromErrors(errors, 'cvc')}
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
