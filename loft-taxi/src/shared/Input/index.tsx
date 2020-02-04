import React, { FC, InputHTMLAttributes, ReactNode } from 'react';
import Button from 'shared/Button';
import './style.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  buttons?: ReactNode[];
}

export const Input: FC<InputProps> = ({
  id,
  required,
  children,
  value,
  onClear,
  buttons,
  ...otherProps
}) => {
  const theInput = (
    <div className="loft-taxi-input">
      <input id={id} required={required} value={value} {...otherProps} />
      {onClear ? (
        <Button
          disabled={!value}
          className="loft-taxi-input-button"
          onClick={e => {
            e.preventDefault();
            onClear();
          }}
        >
          <img src="remove.svg" alt="clear" />
        </Button>
      ) : null}
      {buttons}
    </div>
  );
  if (!children) return <>{theInput}</>;
  return (
    <label htmlFor={id} className="loft-taxi-input-label">
      <div className="loft-taxi-input-label-content">
        {children}
        {required ? <div className="loft-taxi-input-required">*</div> : null}
      </div>
      {theInput}
    </label>
  );
};

export default Input;
