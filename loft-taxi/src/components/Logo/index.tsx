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
  let logoUrl: string;
  try {
    logoUrl = require(`./${name}.svg`);
  } catch (e) {
    console.log(e);
    return null;
  }
  return (
    <div className={classNames('loft-taxi-logo', name)}>
      <img className="loft-taxi-logo-icon" src={logoUrl} alt={`${name}`} />
    </div>
  );
};

export default Logo;
