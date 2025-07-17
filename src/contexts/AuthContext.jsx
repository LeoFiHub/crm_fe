import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load user from localStorage on app start
        const userData = localStorage.getItem('user_data');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user_data');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('user_data', JSON.stringify(userData));
        localStorage.setItem('auth_token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user_data');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('wallet_info');
        localStorage.removeItem('wallet_connected');
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!user;
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    const updateUser = (updatedUser) => {
        localStorage.setItem('user_data', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated,
            hasRole,
            updateUser,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};
