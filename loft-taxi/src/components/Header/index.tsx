import React, { FC, useCallback, useContext } from 'react';
import classNames from 'classnames';
import { PageID, PageInfo, Button, UserContext, pageIsSelectable } from '../../shared';
import UserCard from '../UserCard';
import Logo from '../Logo';
import './style.scss';

export type SelectPageCallback = (id: PageID) => void;

export interface HeaderProps {
  pages: PageInfo[];
  currentPage: PageID;
  selectPage: SelectPageCallback;
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

export const Header: FC<HeaderProps> = ({ pages, currentPage, selectPage }) => {
  const { name } = useContext(UserContext);
  const loggedIn = name !== null;
  const pageButtons = pages.map(p =>
    pageIsSelectable(loggedIn, p.id) ? <PageButton key={p.id} {...p} selected={p.id === currentPage} selectPage={selectPage} /> : null,
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
