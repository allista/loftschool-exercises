import React, { FC } from 'react';
import classNames from 'classnames';
import './style.scss';

export enum LogoName {
  DEFAULT = 'logo',
  WHITE = 'logo-white',
}

export interface LogoProps {
  name?: LogoName;
}

export const Logo: FC<LogoProps> = ({ name = LogoName.DEFAULT }) => {
  const logoUrl = require(`./${name}.svg`);
  return (
    <div className={classNames('loft-taxi-logo', name)}>
      <img className="loft-taxi-logo-icon" src={logoUrl} alt={`logo-${name}`} />
    </div>
  );
};

export default Logo;
