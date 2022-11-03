import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import './MainHeader.css';

const MainHeader = ({ loggedIn }) => (
  <Header additionalClass='header_landing'>
    <Navigation isLanding loggedIn={loggedIn} />
  </Header>
);

export default MainHeader;
