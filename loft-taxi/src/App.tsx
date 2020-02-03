import './App.scss';
import PageSelector from 'components/PageSelector';
import React, { FC } from 'react';

const App: FC = () => {
  return (
      <div className="loft-taxi-main-page">
        <PageSelector />
      </div>
  );
};

export default App;
