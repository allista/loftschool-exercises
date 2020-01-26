import React, { FC, useCallback, useContext } from 'react';
import classNames from 'classnames';
import { PageID, Button, UserContext, NavContext, pageMap, pageIsSelectable } from 'shared';
import UserCard from 'components/UserCard';
import Logo from 'components/Logo';
import './style.scss';

interface PageButtonProps {
  id: PageID;
}

const PageButton: FC<PageButtonProps> = ({ id }) => {
  const { currentPageID, selectPage } = useContext(NavContext);
  const onClick = useCallback(() => selectPage(id), [id, selectPage]);
  const className = classNames(
    { 'loft-taxi-page-selected': id === currentPageID },
    'loft-taxi-header-page',
  );
  return (
    <Button className={className} onClick={onClick}>
      {pageMap[id].title}
    </Button>
  );
};

export const Header: FC = () => {
  const { loggedIn } = useContext(UserContext);
  const { pages } = useContext(NavContext);
  const pageButtons = pages.map(p =>
    pageIsSelectable(loggedIn, p.id) ? <PageButton key={p.id} id={p.id} /> : null,
  );
  return (
    <div className="loft-taxi-header">
      <Logo />
      {pageButtons}
      <UserCard />
    </div>
  );
};

export default Header;
