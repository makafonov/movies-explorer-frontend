import AuthForm from '../AuthForm/AuthForm';

const Register = ({ handleSignUp, authErrorMessage }) => {
  const handleSubmit = ({ email, password, name }) => {
    handleSignUp(email, password, name);
  };

  return AuthForm({ formName: 'signup', isSignUpPage: true, handleSubmit, authErrorMessage });
};

export default Register;
