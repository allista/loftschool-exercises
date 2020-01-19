import React, { FC, useContext } from 'react';
import { UserContext, Button } from '../../shared';

export const UserCard: FC = () => {
  const { name, logout } = useContext(UserContext);
  if (!name) return null;
  return (
    <Button className="loft-taxi-logout-button" onClick={logout}>
      Выход
    </Button>
  );
};

export default UserCard;
