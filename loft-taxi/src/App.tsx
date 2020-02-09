import './App.scss';
import ErrorDisplay from 'components/ErrorDisplay';
import PageSelector from 'components/PageSelector';
import React, { FC } from 'react';

const App: FC = () => {
  return (
    <>
      <ErrorDisplay />
      <div className="loft-taxi-main-page">
        <PageSelector />
      </div>
    </>
  );
};

export default App;
