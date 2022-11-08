import { createContext, useContext } from 'react';

import useProvideAuth from '../hooks/useProvideAuth';

const authContext = createContext();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
const useAuth = () => useContext(authContext);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export { useAuth, ProvideAuth };
