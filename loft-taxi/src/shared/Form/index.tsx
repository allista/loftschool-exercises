import classNames from 'classnames';
import React, { FC, ReactNode, useCallback } from 'react';
import Button from 'shared/Button';
import './style.scss';

export interface FormProps {
  children: {
    title?: ReactNode;
    header?: ReactNode;
    inputs: ReactNode;
    submit: ReactNode;
  };
  onSubmit: () => void;
}

export const FormSep: FC = () => <span className="loft-taxi-form-sep" />;
export const FormSpace: FC<{ width?: string }> = ({ width = '1em', children }) => (
  <div style={{ width }}>{children}</div>
);
export const FormRow: FC = ({ children }) => <div className="loft-taxi-form-row">{children}</div>;
export const FormCol: FC = ({ children }) => <div className="loft-taxi-form-col">{children}</div>;

export interface FormInputGroupProps {
  isColumn?: boolean;
  className?: string;
}

export const FormInputGroup: FC<FormInputGroupProps> = ({
  isColumn = true,
  className,
  children,
}) => (
  <div
    className={classNames({ 'loft-taxi-form-col': isColumn }, 'loft-taxi-form-group', className)}
  >
    {children}
  </div>
);

export const Form: FC<FormProps> = ({ children: { title, header, inputs, submit }, onSubmit }) => {
  const doSubmit = useCallback(
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
      <form onSubmit={doSubmit}>
        {inputs}
        <div className="loft-taxi-form-row">
          <Button type="submit" className="loft-taxi-form-submit">
            {submit}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
