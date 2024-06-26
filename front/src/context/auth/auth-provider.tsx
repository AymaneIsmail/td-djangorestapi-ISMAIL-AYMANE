import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of the context
interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    isLoading: boolean;
    signIn: (username: string, password: string) => Promise<boolean>;
    signOut: () => void;
    getToken(): boolean;
}

// Create the context with an undefined initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};


interface AuthProviderProps {
    children: React.ReactNode;
  }
  
// AuthProvider component
export function InnerAuthContextProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setIsAuthenticated(true);
            setToken(storedToken);
        }
        setIsLoading(false);
    }, []);

    const signIn = async (username: string, password: string) => {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/v1/auth-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        const json = await response.json();

        if(!response.ok) {
            console.error('Error:', json);
            setIsLoading(false);
            setIsAuthenticated(false);
           return false;
        }
        
        const token = json.token;
        console.log('Token:', json.token);
        localStorage.setItem("token", token);
        setToken(token);
        setIsAuthenticated(true);
        setIsLoading(false);

        return true;
    }

    const signOut = () => {
        localStorage.removeItem("token");
        setToken(null);
        setIsAuthenticated(false);
        window.location.href = '/';    
    };


    const getToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            return true
        }
        return false
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, token, isLoading, signIn, signOut, getToken }}>
            {children}
        </AuthContext.Provider>
    );

};