import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormInputGroup, FormRow, PageID, pageMap } from 'shared';
import { setPage } from 'store/page';
import { getUserLoading } from 'store/selectors';
import { login } from 'store/user';

export const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const doLogin = useCallback(() => dispatch(login({ email, password })), [
    dispatch,
    email,
    password,
  ]);
  return (
      <Form onSubmit={doLogin}>
        {{
          submit: 'Войти',
          title: <div className="loft-taxi-page-title">{pageMap[PageID.LOGIN].title}</div>,
          header: (
            <>
              <span>Новый пользователь?</span>
              <div
                className="loft-taxi-form-link"
                onClick={() => dispatch(setPage(PageID.REGISTRATION))}
              >
                Зарегистрируйтесь
              </div>
            </>
          ),
          inputs: (
            <>
              <FormRow>
                <FormInputGroup>
                  <label htmlFor="loginName">Имя пользователя*</label>
                  <input
                    type="email"
                    id="loginName"
                    name="loginName"
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormInputGroup>
              </FormRow>
              <FormRow>
                <FormInputGroup>
                  <label htmlFor="password">Пароль*</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    minLength={6}
                    required
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormInputGroup>
              </FormRow>
            </>
          ),
        }}
      </Form>
  );
};

export default LoginForm;
