import { Link } from 'react-router-dom';

import routes from '../../routes';
import './Logo.css';

const Logo = () => (
  <Link to={routes.home}>
    <div className='logo'></div>
  </Link>
);

export default Logo;
