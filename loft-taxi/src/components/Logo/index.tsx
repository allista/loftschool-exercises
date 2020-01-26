import React, { FC } from 'react';
import classNames from 'classnames';
import './style.scss';

export interface LogoProps {
  name?: string;
}

export const Logo: FC<LogoProps> = ({ name = 'logo' }) => {
  const logoUrl = require(`./${name}.svg`);
  return (
    <div className={classNames('loft-taxi-logo', name)}>
      <img className="loft-taxi-logo-icon" src={logoUrl} alt={`logo-${name}`} />
    </div>
  );
};

export default Logo;
