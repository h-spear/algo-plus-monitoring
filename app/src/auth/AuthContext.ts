import { createContext, useContext } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
    getPasswordWithExpiry: () => string | null;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => false,
    logout: () => {},
    getPasswordWithExpiry: () => '{}',
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};
