import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string;
  isLoading: boolean;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);