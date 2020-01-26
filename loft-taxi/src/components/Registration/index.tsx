import React, { FC, useContext, useState } from 'react';
import { UserContext, NavContext, PageID, pageMap, Form, FormInputGroup, FormRow } from 'shared';
import Logo from 'components/Logo';
import './style.scss';

export const Registration: FC = () => {
  const { login } = useContext(UserContext);
  const { selectPage } = useContext(NavContext);
  const [loginName, setLoginName] = useState('');
  const [name, setName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="loft-taxi-registration">
      <Logo name="logo-white" />
      <Form submitValue="Зарегистрироваться" onSubmit={() => login(loginName, password)}>
        {{
          title: <div className="loft-taxi-page-title">{pageMap[PageID.REGISTRATION].title}</div>,
          header: (
            <>
              <span>Уже зарегистрирваны?</span>
              <div className="loft-taxi-form-link" onClick={() => selectPage(PageID.LOGIN)}>
                Войти
              </div>
            </>
          ),
          inputs: (
            <>
              <FormRow>
                <FormInputGroup>
                  <label htmlFor="loginName">Адрес электронной почты*</label>
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
                  <label htmlFor="name">Имя</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </FormInputGroup>
                <FormInputGroup>
                  <label htmlFor="familyName">Фамилия</label>
                  <input
                    type="text"
                    id="familyName"
                    name="familyName"
                    value={familyName}
                    onChange={e => setFamilyName(e.target.value)}
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

export default Registration;
