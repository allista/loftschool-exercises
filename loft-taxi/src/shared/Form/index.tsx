import React, { FC, ReactNode, useCallback } from 'react';
import classNames from 'classnames';
import './style.scss';

export interface FormProps {
  children: {
    title?: ReactNode;
    header?: ReactNode;
    inputs: ReactNode;
  };
  submitValue: string;
  onSubmit: () => void;
}

export const FormRow: FC = ({ children }) => <div className="loft-taxi-form-row">{children}</div>;
export const FormCol: FC = ({ children }) => <div className="loft-taxi-form-col">{children}</div>;

export interface FormInputGroupProps {
  isColumn?: boolean;
}

export const FormInputGroup: FC<FormInputGroupProps> = ({ isColumn = true, children }) => (
  <div className={classNames({ 'loft-taxi-form-col': isColumn }, 'loft-taxi-form-group')}>
    {children}
  </div>
);

export const Form: FC<FormProps> = ({
  children: { title, header, inputs },
  submitValue,
  onSubmit,
}) => {
  const submit = useCallback(
    evt => {
      evt.preventDefault();
      onSubmit();
    },
    [onSubmit],
  );
  return (
    <div className="loft-taxi-form">
      {title ? <div className="loft-taxi-form-title">{title}</div> : null}
      {header ? <div className="loft-taxi-form-header">{header}</div> : null}
      <form onSubmit={submit}>
        {inputs}
        <div className="loft-taxi-form-row">
          <input type="submit" className="loft-taxi-form-submit" value={submitValue} />
        </div>
      </form>
    </div>
  );
};

export default Form;
