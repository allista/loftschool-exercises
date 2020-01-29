import React, { FC, ButtonHTMLAttributes } from 'react';
import calssNames from 'classnames';
import './style.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ className, children, ...otherProps }) => {
  const buttonClass = calssNames('loft-taxi-button', className);
  return (
    <button className={buttonClass} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
