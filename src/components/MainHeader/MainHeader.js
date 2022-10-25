import { Link } from 'react-router-dom';

import routes from '../../routes';
import Header from '../Header/Header';
import './MainHeader.css';

const MainHeader = () => (
  <Header additionalClass='header_landing'>
    <ul className='header__nav'>
      <li className='header__nav-item'>
        <Link to={routes.signup} className='header__link header__link_type_signup'>
          Регистрация
        </Link>
      </li>
      <li className='header__nav-item'>
        <Link to={routes.signin} className='header__link header__link_type_signin'>
          Войти
        </Link>
      </li>
    </ul>
  </Header>
);


export default MainHeader;
