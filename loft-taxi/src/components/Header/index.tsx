import classNames from 'classnames';
import Logo from 'components/Logo';
import UserCard from 'components/UserCard';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import { PageID, pageIsSelectable, pageMap, pages } from 'shared';
import { isLoggedIn } from 'store/selectors';
import './style.scss';

interface PageButtonProps {
  id: PageID;
}

const PageButton: FC<PageButtonProps> = ({ id }) => {
  const match = useRouteMatch(id);
  const className = classNames(
    { 'loft-taxi-page-selected': match?.isExact },
    'loft-taxi-header-page',
    'loft-taxi-button',
  );
  return (
    <Link to={id} className={className}>
      {pageMap[id].title}
    </Link>
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
