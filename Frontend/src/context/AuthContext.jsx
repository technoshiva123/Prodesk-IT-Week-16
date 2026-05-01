import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');
        if (token) {
            setUser({ name: userName });
        }
        setLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};