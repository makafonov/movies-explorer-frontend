import { Link } from 'react-router-dom';

import accountImg from '../../images/icon-account.svg';
import routes from '../../routes';
import Hamburger from '../Hamburger/Hamburger';
import './Navigation.css';

const Navigation = ({ loggedIn }) =>
  !loggedIn ? (
    <ul className='nav'>
      <li className='nav__item'>
        <Link to={routes.signup} className='nav__link nav__link_type_signup'>
          Регистрация
        </Link>
      </li>
      <li className='header__nav-item'>
        <Link to={routes.signin} className='nav__link nav__link_type_signin'>
          Войти
        </Link>
      </li>
    </ul>
  ) : (
    <>
      <ul className='nav nav_hidden'>
        <li className='nav__item nav__item_type_movies'>
          <Link to={routes.movies} className='nav__link nav__link_type_movies'>
            Фильмы
          </Link>
        </li>
        <li className='nav__item nav__item_type_movies'>
          <Link to={routes.saved} className='nav__link nav__link_type_movies'>
            Сохранённые фильмы
          </Link>
        </li>
        <li className='nav__item nav__item_type_movies'>
          <Link to={routes.profile} className='nav__link nav__link_type_movies'>
            Аккаунт <img className='nav__account' src={accountImg} alt='Аккаунт.' />
          </Link>
        </li>
      </ul>
      <Hamburger />
    </>
  );

export default Navigation;
