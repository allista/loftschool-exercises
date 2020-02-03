import Logo, { LogoName } from 'components/Logo';
import React, { FC } from 'react';
import RegistrationForm from './RegistrationForm';
import './style.scss';

export const Registration: FC = () => {
  return (
    <div className="loft-taxi-registration">
      <Logo name={LogoName.WHITE} />
      <RegistrationForm />
    </div>
  );
};

export default Registration;
