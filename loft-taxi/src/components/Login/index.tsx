import React, { FC, useContext, useState } from 'react';
import {
  UserContext,
  NavContext,
  PageID,
  pageMap,
  Form,
  FormRow,
  FormInputGroup,
} from '../../shared';
import Logo from '../Logo';
import './style.scss';

export const Login: FC = () => {
  const { login } = useContext(UserContext);
  const { selectPage } = useContext(NavContext);
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="loft-taxi-login">
      <Logo name="logo-white" />
      <Form submitValue="Войти" onSubmit={() => login(loginName, password)}>
        {{
          title: <div className="loft-taxi-page-title">{pageMap[PageID.LOGIN].title}</div>,
          header: (
            <>
              <span>Новый пользователь?</span>
              <div className="loft-taxi-form-link" onClick={() => selectPage(PageID.REGISTRATION)}>
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
                    value={loginName}
                    required
                    onChange={e => setLoginName(e.target.value)}
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
    </div>
  );
};

export default Login;
