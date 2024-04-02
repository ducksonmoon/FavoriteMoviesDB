import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: async (username: string, password: string) => {
    throw new Error("login method not implemented");
  },
  logout: () => {
    throw new Error("logout method not implemented");
  },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null); // Adjust the type as needed
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Example: Check for an auth token in local storage and validate it
    const token = localStorage.getItem("authToken");
    if (token) {
      // Implement your token validation logic here
      setIsAuthenticated(true);
      // setUser based on token or additional API call
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Implement login logic here
    // On successful login:
    localStorage.setItem("authToken", "yourTokenHere"); // Adjust as necessary
    setIsAuthenticated(true);
    setUser({
      /* Dummy user data */
    });
    navigate("/"); // Redirect to home or dashboard page
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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

export default AuthContext;
