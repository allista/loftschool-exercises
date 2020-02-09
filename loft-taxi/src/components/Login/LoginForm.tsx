import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormInputGroup, FormRow, PageID, pageMap } from 'shared';
import { getUserLoading } from 'store/selectors';
import { login } from 'store/user';

export const LoginForm: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(getUserLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const doLogin = useCallback(() => dispatch(login({ email, password }, { history })), [
    history,
    dispatch,
    email,
    password,
  ]);
  return (
    <>
      <Form onSubmit={doLogin}>
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
      {isLoading ? <div className="loft-taxi-loading" /> : null}
    </>
  );
};

export default LoginForm;
