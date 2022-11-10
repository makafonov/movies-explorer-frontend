import { createContext, useContext } from 'react';

import useProvideAuth from '../hooks/useProvideAuth';

const authContext = createContext();

const useAuth = () => useContext(authContext);

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export { useAuth, ProvideAuth };
