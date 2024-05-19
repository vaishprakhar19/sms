import React, { createContext, useContext, useState } from 'react';

// Create a context to hold all the states
const AppStateContext = createContext();

// Custom hook to access the states from any component
export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [statesSet, setStatesSet] = useState(false);
  const [stream, setStream] = useState("");
  const [semester, setSemester] = useState(0);

  return (
    <AppStateContext.Provider value={{ loading, setLoading, user, setUser, isRegistered, setIsRegistered, isAdmin, setIsAdmin, statesSet, setStatesSet, stream, setStream, semester, setSemester }}>
      {children}
    </AppStateContext.Provider>
  );
};
