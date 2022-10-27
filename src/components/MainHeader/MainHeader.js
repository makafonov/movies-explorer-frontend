import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import './MainHeader.css';

const MainHeader = () => (
  <Header additionalClass='header_landing'>
    <Navigation isLanding />
  </Header>
);

export default MainHeader;
