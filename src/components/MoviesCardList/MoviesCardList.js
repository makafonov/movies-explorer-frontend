import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import routes from '../../routes';
import { useWindowSize } from '../../utils/hooks';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ movies, savedMovies = [], handleMoviesCardButtonClick }) => {
  const location = useLocation();
  const size = useWindowSize();
  const [paginator, setPaginator] = useState({});
  const isMoviesPage = location.pathname === routes.movies;
  const isSavedMovie = (movie) =>
    savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId);

  useEffect(() => {
    if (isMoviesPage) {
      switch (true) {
        case size.width <= 690:
          setPaginator({ step: 1, start: 5 });
          break;
        case size.width <= 1087:
          setPaginator({ step: 2, start: 8 });
          break;
        default:
          setPaginator({ step: 3, start: 12 });
          break;
      }
    } else {
      setPaginator({ start: movies.length });
    }
  }, [size.width, movies.length, isMoviesPage]);

  const handleMoreButtonClick = () => {
    setPaginator((prev) => ({
      ...prev,
      start: prev.start + prev.step,
    }));
  };

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__container'>
        {movies.slice(0, paginator.start).map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            isSavedMovie={isSavedMovie(movie)}
            handleMoviesCardButtonClick={handleMoviesCardButtonClick}
          />
        ))}
      </ul>
      {isMoviesPage && movies.length > paginator.start && (
        <button className='movies-card-list__more-button' onClick={handleMoreButtonClick}>
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;
