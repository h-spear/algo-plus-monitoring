import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

export interface StoredItem {
    value: string;
    expiry: number;
}

const LOGIN_SESSION_TTL_MS = 2 * 60 * 60 * 1000;
const ADMIN_PASSWORD_KEY = 'admin-password';

const setPasswordWithExpiry = (
    key: string,
    value: string,
    ttlMs: number
): void => {
    const now = Date.now();
    const item: StoredItem = {
        value: value,
        expiry: now + ttlMs,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

const getPasswordWithExpiry = (): string | null => {
    const itemStr = localStorage.getItem(ADMIN_PASSWORD_KEY);
    if (!itemStr) return null;

    const item: StoredItem = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
        localStorage.removeItem(ADMIN_PASSWORD_KEY);
        return null;
    }
    return item.value;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (password: string) => {
        if (password === import.meta.env.VITE_ADMINISTRATOR_PASSWORD) {
            setPasswordWithExpiry(
                ADMIN_PASSWORD_KEY,
                password,
                LOGIN_SESSION_TTL_MS
            );
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem(ADMIN_PASSWORD_KEY);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, logout, getPasswordWithExpiry }}
        >
            {children}
        </AuthContext.Provider>
    );
};
