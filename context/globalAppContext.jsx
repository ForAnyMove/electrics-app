import { createContext, useContext, useState } from 'react';

const ComponentContext = createContext();

export const ComponentProvider = ({ children }) => {
  const [createdJobs, setCreatedJobs] = useState([]);
  
  return (
    <ComponentContext.Provider value={{
      createdJobs,
      setCreatedJobs,
    }}>
      {children}
    </ComponentContext.Provider>
  );
}

export const useComponentContext = () => useContext(ComponentContext);