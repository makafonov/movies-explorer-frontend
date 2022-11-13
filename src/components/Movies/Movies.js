import { useEffect } from 'react';

import mainApi from '../../utils/MainApi';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

const Movies = ({
  handleSubmitSearch,
  movies,
  setSavedMovies,
  savedMovies,
  searchQuery,
  searchCheckboxStatus,
  searchErrorMessage,
  handleMoviesCardButtonClick,
  isLoading,
}) => {
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }

    mainApi
      .getSavedMovies(jwt)
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((error) => {
        console.log(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MoviesHeader />
      <main className='movies'>
        <SearchForm
          handleSubmitSearch={handleSubmitSearch}
          searchQuery={searchQuery}
          searchCheckboxStatus={searchCheckboxStatus}
          searchErrorMessage={searchErrorMessage}
        />
        {isLoading && <Preloader />}
        {!isLoading && movies.length > 0 && (
          <MoviesCardList
            movies={movies}
            savedMovies={savedMovies}
            handleMoviesCardButtonClick={handleMoviesCardButtonClick}
          />
        )}
        {!isLoading && movies.length === 0 && searchQuery && (
          <p className='movies__result'>Ничего не найдено</p>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Movies;
