import React, { FC } from 'react';
import logoIcon from './map-pin.svg';
import './style.scss';

export const Logo: FC = () => {
  return (
    <div className="loft-taxi-logo">
      <img className="loft-taxi-logo-icon" src={logoIcon} alt="logo" />
      <div className="loft-taxi-logo-primary">Loft</div>
      <div className="loft-taxi-logo-secondary">Taxi</div>
    </div>
  );
};

export default Logo;
