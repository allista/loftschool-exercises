import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  emailValidator,
  Form,
  FormRow,
  FormSpace,
  Input,
  inputPropsFromErrors,
  nameValidator,
  PageID,
  pageMap,
  passwordValidator,
} from 'shared';
import { isUserLoading } from 'store/selectors';
import { register as registerUser } from 'store/user';

export const RegistrationForm: FC = () => {
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' });
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(isUserLoading);
  const doRegister = useCallback(
    ({ email, password, name, surname }) => {
      dispatch(registerUser({ email, password, name, surname }, { history }));
    },
    [history, dispatch],
  );
  return (
    <>
      <Form onSubmit={handleSubmit(doRegister)}>
        {{
          submit: 'Зарегистрироваться',
          title: <div className="loft-taxi-page-title">{pageMap[PageID.REGISTRATION].title}</div>,
          header: (
            <>
              <span>Уже зарегистрирваны?</span>
              <div className="loft-taxi-form-link" onClick={() => history.push(PageID.LOGIN)}>
                Войти
              </div>
            </>
          ),
          inputs: (
            <>
              <FormRow>
                <Input
                  type="email"
                  name="email"
                  required
                  ref={register(emailValidator)}
                  {...inputPropsFromErrors(errors, 'email')}
                >
                  Адрес электронной почты
                </Input>
              </FormRow>
              <FormRow>
                <Input
                  type="text"
                  name="name"
                  required
                  width="40%"
                  ref={register(nameValidator)}
                  {...inputPropsFromErrors(errors, 'name')}
                >
                  Имя
                </Input>
                <FormSpace />
                <Input
                  type="text"
                  name="surname"
                  required
                  width="40%"
                  ref={register(nameValidator)}
                  {...inputPropsFromErrors(errors, 'surname')}
                >
                  Фамилия
                </Input>
              </FormRow>
              <FormRow>
                <Input
                  type="password"
                  name="password"
                  required
                  ref={register(passwordValidator)}
                  {...inputPropsFromErrors(errors, 'password')}
                >
                  Пароль
                </Input>
              </FormRow>
            </>
          ),
        }}
      </Form>
      {isLoading ? <div className="loft-taxi-loading" /> : null}
    </>
  );
};

export default RegistrationForm;
