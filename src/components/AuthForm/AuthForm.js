import { Link } from 'react-router-dom';

import routes from '../../routes';
import Logo from '../Logo/Logo';
import './AuthForm.css';

const AuthForm = ({ formName, isSignUpPage }) => {
  const title = isSignUpPage ? 'Добро пожаловать!' : 'Рады видеть!';
  const submitText = isSignUpPage ? 'Зарегистрироваться' : 'Войти';
  const submitClassName = `auth__submit ${!isSignUpPage && 'auth__submit_type_signin'}`;
  const adviceText = isSignUpPage ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?';
  const adviceLink = isSignUpPage ? routes.signin : routes.signup;
  const adviceLinkText = isSignUpPage ? 'Войти' : 'Регистрация';

  return (
    <main className='auth'>
      <div className='auth__container'>
        <Logo />
        <h2 className='auth__title'>{title}</h2>
        <form className='auth__form' name={formName} noValidate>
          {isSignUpPage && (
            <label className='auth__label'>
              <span className='auth__placeholder'>Имя</span>
              <input className='auth__input' type='text' name='name' />
              <span className='auth__error auth__error-name'>Что-то пошло не так...</span>
            </label>
          )}
          <label className='auth__label'>
            <span className='auth__placeholder'>E-mail</span>
            <input className='auth__input' type='email' name='email' />
            <span className='auth__error auth__error-email'>Что-то пошло не так...</span>
          </label>
          <label className='auth__label'>
            <span className='auth__placeholder'>Пароль</span>
            <input className='auth__input' type='password' name='password' />
            <span className='auth__error auth__error-password' style={{ visibility: 'visible' }}>
              Что-то пошло не так...
            </span>
          </label>
          <button type='submit' className={submitClassName}>
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
