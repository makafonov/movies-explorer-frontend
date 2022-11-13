import { useEffect } from 'react';

import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({
  handleSubmitSearch,
  movies,
  handleMoviesCardButtonClick,
  searchQuerySaved,
  searchCheckboxStatusSaved,
  cleanUpSearchResult
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => cleanUpSearchResult(), []);

  return (
    <>
      <MoviesHeader />
      <main className='movies'>
        <SearchForm
          handleSubmitSearch={handleSubmitSearch}
          searchQuery={searchQuerySaved}
          searchCheckboxStatus={searchCheckboxStatusSaved}
        />
        {movies.length > 0 && (
          <MoviesCardList
            movies={movies}
            handleMoviesCardButtonClick={handleMoviesCardButtonClick}
          />
        )}
        {movies.length === 0 && (searchQuerySaved || searchCheckboxStatusSaved) && (
          <p className='movies__result'>Ничего не найдено</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
