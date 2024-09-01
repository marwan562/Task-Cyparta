"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { IUser, TUpdateUser } from "@/types";
import { loginUserApi } from "@/actions/authApi";
import { getUserApi, updateUserDetailsApi } from "@/actions/userApi";

type AuthContextType = {
  user: IUser | null;
  loading: boolean;
  loginUser: (body: { email: string; password: string }) => Promise<void>;
  logoutUser: () => void;
  getUser: () => Promise<void>;
  updateUserDetails: (body: TUpdateUser) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      await getUser();
    } catch (error) {
      console.error("Error fetching user:", error);
      logoutUser();
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (body: { email: string; password: string }) => {
    setLoading(true);
    try {
      const data = await loginUserApi(body);
      Cookies.set("token", data.token);
      await fetchUser();
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    Cookies.remove("token");
    setUser(null);
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const data = await getUserApi(Cookies.get("token") ?? null);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      logoutUser();
    } finally {
      setLoading(false);
    }
  };

  const updateUserDetails = async (body: TUpdateUser) => {
    setLoading(true);
    try {
      const updatedUser = await updateUserDetailsApi({
        body,
        token: Cookies.get("token") ?? null,
      });
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        logoutUser,
        getUser,
        updateUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
