import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorItem, ErrorKey, removeError } from 'store/errors';
import { getErrors } from 'store/selectors';
import './style.scss';

export interface ErrorDisplayProps {}

interface ErrorCardProps {
  id: ErrorKey;
  error: ErrorItem;
}

const ErrorCard: FC<ErrorCardProps> = ({ id, error: { message, content } }) => {
  const dispatch = useDispatch();
  const removeSelf = useCallback(() => dispatch(removeError(id)), [dispatch, id]);
  return (
    <div className="loft-taxi-error-card" onClick={removeSelf}>
      <div className="loft-taxi-error-message">{message}</div>
      {content && content.length > 0 && (
        <ul className="loft-taxi-error-content">
          {content.map((c, i) => (
            <li key={i} className="loft-taxi-error-content-item">
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const ErrorDisplay: FC<ErrorDisplayProps> = () => {
  const errors = useSelector(getErrors);
  return (
    <div className="loft-taxi-errors">
      {Object.keys(errors)
        .sort()
        .map(id => (
          <ErrorCard key={id} id={id} error={errors[id]} />
        ))}
    </div>
  );
};

export default ErrorDisplay;
