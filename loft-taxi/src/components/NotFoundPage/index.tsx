import React, { FC } from 'react';
import './style.scss';

export interface NotFoundPageProps {}

export const NotFoundPage: FC<NotFoundPageProps> = () => (
  <div className="loft-taxi-not-found-page">
    <h2>404</h2>
    <p>Страница не найдена</p>
  </div>
);

export default NotFoundPage;
