import React, { FC, useCallback } from 'react';
import classNames from 'classnames';
import { PageID, PageInfo, Button } from '../../shared';

export type SelectPageCallback = (id: PageID) => void;

export interface HeaderProps {
  title: string;
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
  title,
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
      <div className="loft-taxi-header-title">{title}</div>
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
