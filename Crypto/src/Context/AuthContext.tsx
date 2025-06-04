import { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/UserModel";

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserProfile | undefined;
  login: (user: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    //setIsLoading(false);
  }, []);

  const login = (user: UserProfile) => {
    setUser(user);
    setIsLoggedIn(true);
    console.log(user);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
