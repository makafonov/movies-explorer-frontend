import Logo from '../Logo/Logo';
import './Header.css';

const Header = ({ children, additionalClass }) => (
  <header className={`header ${additionalClass || ''}`}>
    <div className='header__container'>
      <Logo />
      {children}
    </div>
  </header>
);

export default Header;
