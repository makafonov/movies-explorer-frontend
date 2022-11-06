import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({
  loggedIn,
  handleSubmitSearch,
  movies,
  handleMoviesCardButtonClick,
  searchQuerySaved,
  searchCheckboxStatusSaved,
}) => (
  <>
    <MoviesHeader loggedIn={loggedIn} />
    <main className='movies'>
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        searchQuery={searchQuerySaved}
        searchCheckboxStatus={searchCheckboxStatusSaved}
      />
      <MoviesCardList movies={movies} handleMoviesCardButtonClick={handleMoviesCardButtonClick} />
    </main>
    <Footer />
  </>
);

export default SavedMovies;
