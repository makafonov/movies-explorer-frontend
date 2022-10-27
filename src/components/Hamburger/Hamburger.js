import { Link, NavLink } from 'react-router-dom';

import routes from '../../routes';
import './Hamburger.css';

const Hamburger = () => {
  const getLinkClassName = ({ isActive }) =>
    `hamburger__link ${isActive && 'hamburger__link_active'}`;

  return (
    <div className='hamburger'>
      <input className='hamburger__input' id='hamburger' type='checkbox' />
      <label className='hamburger__btn' htmlFor='hamburger'>
        <span className='hamburger__line'></span>
      </label>
      <div className='hamburger__overlay'></div>
      <ul className='hamburger__menu'>
        <li className='hamburger__item'>
          <NavLink to={routes.home} className={getLinkClassName} end>
            Главная
          </NavLink>
        </li>
        <li className='hamburger__item'>
          <NavLink to={routes.movies} className={getLinkClassName}>
            Фильмы
          </NavLink>
        </li>
        <li className='hamburger__item'>
          <NavLink to={routes.saved} className={getLinkClassName}>
            Сохранённые фильмы
          </NavLink>
        </li>
        <li className='hamburger__item'>
          <Link to={routes.profile} className='hamburger__account'>
            Аккаунт
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Hamburger;
