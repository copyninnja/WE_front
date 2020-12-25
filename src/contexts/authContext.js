import React, { useState, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = (username, password) => {
    setTimeout(() => {
      // validate user
      setIsAuthenticated(true);
    }, 100);
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 1);
    firebase.auth().signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
