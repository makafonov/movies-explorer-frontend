import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ loggedIn, movies, handleMoviesCardButtonClick }) => (
  <>
    <MoviesHeader loggedIn={loggedIn} />
    <main className='movies'>
      <SearchForm />
      <MoviesCardList movies={movies} handleMoviesCardButtonClick={handleMoviesCardButtonClick} />
    </main>
    <Footer />
  </>
);

export default SavedMovies;
