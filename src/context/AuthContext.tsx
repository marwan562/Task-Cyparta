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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const { push } = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      Cookies.set("accessToken", data.access, { expires: 1 });
      Cookies.set("refreshToken", data.refresh);
      toast.success("Login User Successfully.");
      await fetchUser();
      push("/employees/profile");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    push("/login");
    setUser(null);
    toast.info("Logged out successfully.");
  };

  const getUser = async () => {
    let accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      logoutUser();
      return;
    }

    setLoading(true);
    try {
      const data = await getUserApi(accessToken);
      setUser(data);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const updateUserDetails = async (body: TUpdateUser) => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      toast.error("User is not authenticated. Please log in again.");
      logoutUser();
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await updateUserDetailsApi({
        body,
        token: accessToken,
      });
      setUser(updatedUser);
      toast.success("User details updated successfully.");
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update user details. Please try again.");
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
