import React, { useState, useCallback } from 'react';
import './App.scss';
import Header from './components/Header';
import PageSelector from './components/PageSelector';
import { pageTitles, PageID, UserContext } from './shared';

export const pages = [PageID.LOGIN, PageID.MAP, PageID.PROFILE, PageID.REGISTRATION].map(p => ({
  id: p,
  title: pageTitles[p],
}));

const App: React.FC = () => {
  const [pageID, setPage] = useState(pages[0].id);
  const [userName, setUserName] = useState<string | null>(null);
  const login = useCallback((name: string, _: string) => setUserName(name), [setUserName]);
  const logout = useCallback(() => setUserName(null), [setUserName]);
  return (
    <UserContext.Provider value={{ name: userName, login, logout }}>
      <div className="loft-taxi-main-page">
        <Header pages={pages} currentPage={pageID} selectPage={setPage} />
        <h2 style={{ textAlign: 'center' }}>{pageTitles[pageID]}</h2>
        <PageSelector pageID={pageID} />
      </div>
    </UserContext.Provider>
  );
};

export default App;
