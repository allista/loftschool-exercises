import React, { useState, useCallback } from 'react';
import './App.scss';
import Header from './components/Header';
import PageSelector from './components/PageSelector';
import { UserContext, NavContext, pages, pageIsSelectable, PageID } from './shared';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [currentPageID, setPage] = useState(pages[0].id);
  const login = useCallback(
    (name: string, _: string) => {
      setUserName(name);
      setPage(PageID.MAP);
    },
    [setUserName, setPage],
  );
  const logout = useCallback(() => {
    setUserName(null);
    setPage(PageID.MAP);
  }, [setUserName, setPage]);
  const loggedIn = userName !== null;
  const selectPage = useCallback(
    (pageID: PageID) => {
      if (pageIsSelectable(loggedIn, pageID)) setPage(pageID);
      else setPage(PageID.MAP);
    },
    [loggedIn, setPage],
  );
  return (
    <UserContext.Provider value={{ loggedIn, name: userName, login, logout }}>
      <NavContext.Provider value={{ currentPageID, pages, selectPage }}>
        <div className="loft-taxi-main-page">
          <Header />
          <div className="loft-taxi-page-content">
            <PageSelector pageID={currentPageID} />
          </div>
        </div>
      </NavContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
