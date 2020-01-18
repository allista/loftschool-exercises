import React, { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import PageSelector from './components/PageSelector';
import { pageTitles, PageID } from './shared';

export const pages = [PageID.LOGIN, PageID.MAP, PageID.PROFILE, PageID.REGISTRATION].map(p => ({
  id: p,
  title: pageTitles[p],
}));

const App: React.FC = () => {
  const [pageID, setPage] = useState(pages[0].id);
  return (
    <div className="loft-taxi-main-page">
      <Header
        pages={pages}
        currentPage={pageID}
        selectPage={setPage}
        loggedIn={false}
        logout={() => null}
      />
      <h2>{pageTitles[pageID]}</h2>
      <PageSelector pageID={pageID} />
    </div>
  );
};

export default App;
