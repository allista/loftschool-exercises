import React, { FC } from 'react';
import calssNames from 'classnames';
import './style.scss';

export interface ButtonProps {
  onClick: (event?: React.MouseEvent) => void;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ className, onClick, children }) => {
  const buttonClass = calssNames(className, 'loft-taxi-button');
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
