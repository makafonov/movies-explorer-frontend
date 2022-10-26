import movies from '../../utils/consts';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

const SavedMovies = () => (
  <>
    <MoviesHeader />
    <SearchForm />
    <MoviesCardList movies={movies.slice(0, 3)} />
    <Footer />
  </>
);

export default SavedMovies;
