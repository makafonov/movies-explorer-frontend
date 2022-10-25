import { Link } from 'react-router-dom';

import accountImg from '../../images/icon-account.svg';
import routes from '../../routes';
import Header from '../Header/Header';
import './MoviesHeader.css';

const MoviesHeader = () => (
  <Header>
    <ul className='header__nav'>
      <li className='header__nav-item header__nav-item_movies'>
        <Link to={routes.movies} className='header__link header__link_movies'>
          Фильмы
        </Link>
      </li>
      <li className='header__nav-item header__nav-item_movies'>
        <Link to={routes.saved} className='header__link header__link_movies'>
          Сохранённые фильмы
        </Link>
      </li>
      <li className='header__nav-item header__nav-item_movies'>
        <Link to={routes.profile} className='header__link header__link_movies'>
          Аккаунт <img className='header__nav-account' src={accountImg} alt='Аккаунт.' />
        </Link>
      </li>
    </ul>
  </Header>
);

export default MoviesHeader;
