import React, { ReactNode, useContext } from "react";

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = async (token: string) => {
    // FIXME:一時的にlocalStorageに保存する。要リファクタ
    localStorage.setItem("auth_token", token);
  };

  const logout = () => localStorage.removeItem("auth_token");

  const value = {
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
