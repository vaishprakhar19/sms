import React, { createContext, useContext, useState ,useEffect} from 'react';

// Create a context to hold all the states
const AppStateContext = createContext();

// Custom hook to access the states from any component
export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);
  return (
    <AppStateContext.Provider value={{ loading, setLoading, user, setUser, isRegistered, setIsRegistered, isAdmin, setIsAdmin }}>
      {children}
    </AppStateContext.Provider>
  );
};
