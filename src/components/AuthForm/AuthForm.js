import { Link } from 'react-router-dom';

import routes from '../../routes';
import { useFormWithValidation } from '../../utils/hooks';
import Logo from '../Logo/Logo';
import './AuthForm.css';

const AuthForm = ({ formName, isSignUpPage, handleSubmit, authErrorMessage }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: '',
    email: '',
    password: '',
  });

  const title = isSignUpPage ? 'Добро пожаловать!' : 'Рады видеть!';
  const submitText = isSignUpPage ? 'Зарегистрироваться' : 'Войти';
  const adviceText = isSignUpPage ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?';
  const adviceLink = isSignUpPage ? routes.signin : routes.signup;
  const adviceLinkText = isSignUpPage ? 'Войти' : 'Регистрация';
  const errorClassName = `auth__server-error ${!isSignUpPage && 'auth__server-error_type_signin'} ${
    authErrorMessage && 'auth__error_visible'
  }`;

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit(values);
  };

  return (
    <main className='auth'>
      <div className='auth__container'>
        <Logo />
        <h2 className='auth__title'>{title}</h2>
        <form className='auth__form' name={formName} noValidate onSubmit={submitForm}>
          {isSignUpPage && (
            <label className='auth__label'>
              <span className='auth__placeholder'>Имя</span>
              <input
                className='auth__input'
                type='text'
                name='name'
                onChange={handleChange}
                value={values.name}
                pattern='[a-zA-Zа-яА-ЯёË\s\-]+'
                minLength='2'
                maxLength='30'
                required
              />
              <span className={`auth__error ${errors?.name && 'auth__error_visible'}`}>
                {errors.name}
              </span>
            </label>
          )}
          <label className='auth__label'>
            <span className='auth__placeholder'>E-mail</span>
            <input
              className='auth__input'
              type='email'
              name='email'
              onChange={handleChange}
              value={values.email}
              pattern='[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}'
              required
            />
            <span className={`auth__error ${errors?.email && 'auth__error_visible'}`}>
              {errors.email}
            </span>
          </label>
          <label className='auth__label'>
            <span className='auth__placeholder'>Пароль</span>
            <input
              className='auth__input'
              type='password'
              name='password'
              onChange={handleChange}
              value={values.password}
              required
            />
            <span className={`auth__error ${errors?.password && 'auth__error_visible'}`}>
              {errors.password}
            </span>
          </label>

          <span className={errorClassName}>{authErrorMessage}</span>
          <button type='submit' className='auth__submit' disabled={!isValid}>
            {submitText}
          </button>
          <p className='auth__advice'>
            {adviceText}
            <Link to={adviceLink} className='auth__link'>
              {adviceLinkText}
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default AuthForm;
