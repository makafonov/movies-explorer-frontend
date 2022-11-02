import AuthForm from '../AuthForm/AuthForm';

const Login = ({ handleSighIn, serverErrorMessage }) => {
  const handleSubmit = ({ email, password }) => {
    handleSighIn(email, password);
  };

  return AuthForm({ formName: 'signin', isSignUpPage: false, handleSubmit, serverErrorMessage });
};

export default Login;
