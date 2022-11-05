import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

const Movies = ({
  loggedIn,
  handleSubmitSearch,
  movies,
  searchQuery,
  searchCheckboxStatus,
  searchErrorMessage,
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
      <MoviesCardList movies={movies} />
    </main>
    <Footer />
  </>
);

export default Movies;
