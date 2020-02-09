import Logo, { LogoName } from 'components/Logo';
import React, { FC } from 'react';
import LoginForm from './LoginForm';
import './style.scss';

export const Login: FC = () => (
  <div className="loft-taxi-login">
    <Logo name={LogoName.WHITE} />
    <LoginForm />
  </div>
);

export default Login;
