import apiClient from "@/lib/apiClient";
import { useRouter } from "next/router";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: null | UserInfoType;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface UserInfoType {
  id: number;
  email: string;
  username: string;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | UserInfoType>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
    apiClient
      .get("find-user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const login = async (token: string) => {
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
    localStorage.setItem("auth_token", token);

    apiClient
      .get("find-user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    delete apiClient.defaults.headers["Authorization"];
    setUser(null);
    router.push("/login");
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
