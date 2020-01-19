import React from 'react';

export interface UserContextProps {
  name: string | null;
  login: (login: string, password: string) => void;
  logout: () => void;
}

export const UserContext = React.createContext<UserContextProps>({
  name: null,
  login: () => {},
  logout: () => {},
});

export default UserContext;
