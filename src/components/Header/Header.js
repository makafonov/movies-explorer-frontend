import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className='header'>
    <div className='header__container'>
      <Link to='/'>
        <div className='logo'></div>
      </Link>
        <ul className='header__nav'>
          <li>
            <Link to='/signup' className='header__link header__link_type_signup'>
              Регистрация
            </Link>
          </li>
          <li>
            <Link to='/signin' className='header__link header__link_type_signin'>
              Войти
            </Link>
          </li>
        </ul>
    </div>
  </header>
);

export default Header;
