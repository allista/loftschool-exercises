import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared';
import { isLoggedIn } from 'store/selectors';
import { logout } from 'store/user';
import './style.scss';

export const UserCard: FC = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(isLoggedIn);
  if (!loggedIn) return null;
  return (
    <Button className="loft-taxi-logout-button" onClick={() => dispatch(logout())}>
      Выход
    </Button>
  );
};

export default UserCard;
