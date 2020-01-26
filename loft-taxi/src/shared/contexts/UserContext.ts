import React from 'react';

export interface UserContextProps {
  name: string | null;
  loggedIn: boolean;
  login: (login: string, password: string) => void;
  logout: () => void;
}

export const UserContext = React.createContext<UserContextProps>({
  name: null,
  loggedIn: false,
  login: () => {},
  logout: () => {},
});

export default UserContext;
