import React from 'react';

export interface UserContextProps {
  name: string | null;
  login?: (name: string, password: string) => void;
  logout?: () => void;
}

export const UserContext = React.createContext<UserContextProps>({ name: null });

export default UserContext;
