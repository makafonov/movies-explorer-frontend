import AuthForm from '../AuthForm/AuthForm';

const Register = ({ handleSignUp, serverErrorMessage }) => {
  const handleSubmit = ({ email, password, name }) => {
    handleSignUp(email, password, name);
  };

  return AuthForm({ formName: 'signup', isSignUpPage: true, handleSubmit, serverErrorMessage });
};

export default Register;
