import React, { FC, useCallback } from 'react';
import classNames from 'classnames';
import { PageID, PageInfo, Button } from '../../shared';
import Logo from '../Logo';

export type SelectPageCallback = (id: PageID) => void;

export interface HeaderProps {
  pages: PageInfo[];
  currentPage: PageID;
  selectPage: SelectPageCallback;
  loggedIn: boolean;
  logout: () => void;
}

interface PageButtonProps extends PageInfo {
  selected: boolean;
  selectPage: SelectPageCallback;
}

const PageButton: FC<PageButtonProps> = ({ id, title, selected, selectPage }) => {
  const onClick = useCallback(() => selectPage(id), [id]);
  const className = classNames({ 'loft-taxi-page-selected': selected }, 'loft-taxi-header-page');
  return (
    <Button className={className} onClick={onClick}>
      {title}
    </Button>
  );
};

export const Header: FC<HeaderProps> = ({
  pages,
  currentPage,
  selectPage,
  loggedIn,
  logout,
}) => {
  const pageButtons = pages.map(p =>
    loggedIn && (p.id === PageID.LOGIN || p.id === PageID.REGISTRATION) ? null : (
      <PageButton key={p.id} {...p} selected={p.id === currentPage} selectPage={selectPage} />
    ),
  );
  return (
    <div className="loft-taxi-header">
      <Logo />
      {pageButtons}
      {loggedIn ? (
        <Button className="loft-taxi-logout-button" onClick={logout}>
          Выйти
        </Button>
      ) : null}
    </div>
  );
};

export default Header;
