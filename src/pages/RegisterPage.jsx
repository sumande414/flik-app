import React from 'react';
import Register from '../components/Register';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (accessToken, refreshToken) => {
    login(accessToken, refreshToken);
    navigate('/home');
  };

  return (
    <>
      <Header />
      <Register onRegister={handleRegister} />
    </>
  );
};

export default RegisterPage;