import React, { FC, useContext, useCallback } from 'react';
import { UserContext, Button } from '../../shared';

export const UserCard: FC = () => {
  const { name, logout } = useContext(UserContext);
  const onClick = useCallback(() => logout && logout(), [logout]);
  if (!name) return null;
  return (
    <Button className="loft-taxi-logout-button" onClick={onClick}>
      Выход
    </Button>
  );
};

export default UserCard;
