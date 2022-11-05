import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

const Movies = ({
  loggedIn,
  handleSubmitSearch,
  movies,
  savedMovies,
  searchQuery,
  searchCheckboxStatus,
  searchErrorMessage,
  handleMoviesCardButtonClick,
}) => (
  <>
    <MoviesHeader loggedIn={loggedIn} />
    <main className='movies'>
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        searchQuery={searchQuery}
        searchCheckboxStatus={searchCheckboxStatus}
        searchErrorMessage={searchErrorMessage}
      />
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
        handleMoviesCardButtonClick={handleMoviesCardButtonClick}
      />
    </main>
    <Footer />
  </>
);

export default Movies;
