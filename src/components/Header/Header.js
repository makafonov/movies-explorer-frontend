import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import './Header.css';

const Header = ({ children, additionalClass }) => (
  <header className={`header ${additionalClass || ''}`}>
    <div className='header__container'>
      <Link to='/'>
        <Logo />
      </Link>
      {children}
    </div>
  </header>
);

export default Header;
