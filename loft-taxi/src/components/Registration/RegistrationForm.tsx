import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormInputGroup, FormRow, PageID, pageMap } from 'shared';
import { isUserLoading } from 'store/selectors';
import { register } from 'store/user';

export const RegistrationForm: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(isUserLoading);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const doRegister = useCallback(
    () => dispatch(register({ email, password, name, surname }, { history })),
    [history, dispatch, email, password, name, surname],
  );
  return (
    <>
      <Form onSubmit={doRegister}>
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
                <FormInputGroup>
                  <label htmlFor="loginName">Адрес электронной почты*</label>
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
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
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
      {isLoading ? <div className="loft-taxi-loading" /> : null}
    </>
  );
};

export default RegistrationForm;
