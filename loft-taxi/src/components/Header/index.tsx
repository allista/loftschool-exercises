import classNames from 'classnames';
import Logo from 'components/Logo';
import UserCard from 'components/UserCard';
import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, PageID, pageIsSelectable, pageMap, pages } from 'shared';
import { setPage } from 'store/page';
import { getPageID, isLoggedIn } from 'store/selectors';
import './style.scss';

interface PageButtonProps {
  id: PageID;
}

const PageButton: FC<PageButtonProps> = ({ id }) => {
  const dispatch = useDispatch();
  const currentPageID = useSelector(getPageID);
  const onClick = useCallback(() => dispatch(setPage(id)), [id, dispatch]);
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
  const loggedIn = useSelector(isLoggedIn);
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
