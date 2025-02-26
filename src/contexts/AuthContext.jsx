import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Changed to named import
import { refreshToken } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      let accessToken = localStorage.getItem('accessToken');
      const refreshTokenValue = localStorage.getItem('refreshToken');

      if (accessToken) {
        try {
          const decoded = jwtDecode(accessToken);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decoded.exp < currentTime) {
            if (refreshTokenValue) {
              console.log('Access token expired, attempting to refresh...');
              const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshToken(refreshTokenValue);
              localStorage.setItem('accessToken', newAccessToken);
              localStorage.setItem('refreshToken', newRefreshToken);
              setUser({ isAuthenticated: true });
            } else {
              console.log('No refresh token available, logging out');
              logout();
            }
          } else {
            setUser({ isAuthenticated: true });
          }
        } catch (e) {
          console.error('Token initialization failed:', e);
          if (refreshTokenValue) {
            try {
              console.log('Retrying with refresh token...');
              const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshToken(refreshTokenValue);
              localStorage.setItem('accessToken', newAccessToken);
              localStorage.setItem('refreshToken', newRefreshToken);
              setUser({ isAuthenticated: true });
            } catch (refreshError) {
              console.error('Refresh failed:', refreshError);
              logout();
            }
          } else {
            logout();
          }
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setUser({ isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};