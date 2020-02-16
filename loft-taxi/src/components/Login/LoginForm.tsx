import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormRow,
  PageID,
  pageMap,
  Input,
  inputPropsFromErrors,
  emailValidator,
} from 'shared';
import { isUserLoading } from 'store/selectors';
import { login } from 'store/user';

export const LoginForm: FC = () => {
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' });
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(isUserLoading);
  const doLogin = useCallback(
    ({ email, password }) => {
      dispatch(login({ email, password }, { history }));
    },
    [history, dispatch],
  );
  return (
    <>
      <Form onSubmit={handleSubmit(doLogin)}>
        {{
          submit: 'Войти',
          title: <div className="loft-taxi-page-title">{pageMap[PageID.LOGIN].title}</div>,
          header: (
            <>
              <span>Новый пользователь?</span>
              <div
                className="loft-taxi-form-link"
                onClick={() => history.push(PageID.REGISTRATION)}
              >
                Зарегистрируйтесь
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
                  Имя пользователя
                </Input>
              </FormRow>
              <FormRow>
                <Input
                  type="password"
                  name="password"
                  required
                  ref={register({ required: 'Обязательное поле' })}
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

export default LoginForm;
