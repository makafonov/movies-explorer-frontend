import AuthForm from '../AuthForm/AuthForm';

const Login = ({ handleSighIn, authErrorMessage }) => {
  const handleSubmit = ({ email, password }) => {
    handleSighIn(email, password);
  };

  return AuthForm({ formName: 'signin', isSignUpPage: false, handleSubmit, authErrorMessage });
};

export default Login;
