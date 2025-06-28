import { createContext, useContext } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => false,
    logout: () => {},
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};
