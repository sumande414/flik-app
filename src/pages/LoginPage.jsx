import React from 'react';
import Login from '../components/Login';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (accessToken, refreshToken) => {
    login(accessToken, refreshToken);
    navigate('/home');
  };

  return (
    <>
      <Header />
      <Login onLogin={handleLogin} />
    </>
  );
};

export default LoginPage;