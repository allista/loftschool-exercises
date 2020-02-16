import React, { InputHTMLAttributes, ReactNode, RefForwardingComponent, forwardRef } from 'react';
import classNames from 'classnames';
import Button from 'shared/Button';
import './style.scss';

export enum InputState {
  NORMAL,
  WARNING,
  ERROR,
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  message?: string;
  inputState?: InputState;
  onClear?: () => void;
  buttons?: ReactNode[];
}

const stateClass = (baseClass: string, inputState: InputState) =>
  classNames(
    { [`${baseClass}--error`]: inputState === InputState.ERROR },
    { [`${baseClass}--warning`]: inputState === InputState.WARNING },
    baseClass,
  );

const InputInner: RefForwardingComponent<HTMLInputElement, InputProps> = (
  {
    id,
    required,
    children,
    value,
    onClear,
    buttons,
    message,
    inputState = InputState.NORMAL,
    ...otherProps
  },
  ref,
) => {
  const buttonClass =
    (onClear || buttons) && stateClass('loft-taxi-input__field__button', inputState);
  const theInput = (
    <div className={stateClass('loft-taxi-input__field', inputState)}>
      <input
        ref={ref}
        className="loft-taxi-input__field__input"
        id={id}
        required={required}
        value={value}
        {...otherProps}
      />
      {onClear ? (
        <Button
          className={buttonClass}
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
  return (
    <label htmlFor={id} className="loft-taxi-input">
      {children && (
        <div className="loft-taxi-input__label">
          {children}
          {required ? <span className="loft-taxi-input__label__required" /> : null}
        </div>
      )}
      {theInput}
      <div className={stateClass('loft-taxi-input__message', inputState)}>{message}</div>
    </label>
  );
};

export const Input = forwardRef(InputInner);
