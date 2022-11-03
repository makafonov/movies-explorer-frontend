import movies from '../../utils/consts';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ loggedIn }) => (
  <>
    <MoviesHeader loggedIn={loggedIn} />
    <main>
      <SearchForm />
      <MoviesCardList movies={movies.slice(0, 8)} />
    </main>
    <Footer />
  </>
);

export default Movies;
