import { useState } from 'react';

import { useAuth } from '../../contexts/ProvideAuth';
import AuthForm from '../AuthForm/AuthForm';

const Login = () => {
  const { handleSignIn } = useAuth();
  const [authErrorMessage, setAuthErrorMessage] = useState('');

  const handleSubmit = ({ email, password }) => {
    handleSignIn(email, password).catch((error) => {
      setAuthErrorMessage(
        error.status === 401
          ? 'Вы ввели неправильный логин или пароль.'
          : 'При авторизации произошла ошибка.'
      );
    });
  };

  return AuthForm({ formName: 'signin', isSignUpPage: false, handleSubmit, authErrorMessage });
};

export default Login;
