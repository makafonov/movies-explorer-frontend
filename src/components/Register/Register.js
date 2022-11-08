import { useState } from 'react';

import { useAuth } from '../../contexts/ProvideAuth';
import AuthForm from '../AuthForm/AuthForm';

const Register = () => {
  const auth = useAuth();
  const [authErrorMessage, setAuthErrorMessage] = useState('');

  const handleSubmit = ({ email, password, name }) => {
    auth.handleSignUp(email, password, name).catch((error) => {
      setAuthErrorMessage(
        error.status === 409
          ? 'Пользователь с таким email уже существует.'
          : 'При регистрации пользователя произошла ошибка.'
      );
    });
  };

  return AuthForm({ formName: 'signup', isSignUpPage: true, handleSubmit, authErrorMessage });
};

export default Register;
