import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import Preloader from '../Preloader/Preloader';
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
  isLoading,
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
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          handleMoviesCardButtonClick={handleMoviesCardButtonClick}
        />
      )}
    </main>

    <Footer />
  </>
);

export default Movies;
