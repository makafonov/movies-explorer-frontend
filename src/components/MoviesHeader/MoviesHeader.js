import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

const MoviesHeader = ({ loggedIn }) => (
  <Header>
    <Navigation loggedIn={loggedIn} />
  </Header>
);

export default MoviesHeader;
