import { useLocation } from 'react-router-dom';

import routes from '../../routes';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ movies, savedMovies = [], handleMoviesCardButtonClick }) => {
  const location = useLocation();
  const isMoviesPage = location.pathname === routes.movies;
  const isSavedMovie = (movie) =>
    savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId);

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__container'>
        {movies.map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            isSavedMovie={isSavedMovie(movie)}
            handleMoviesCardButtonClick={handleMoviesCardButtonClick}
          />
        ))}
      </ul>
      {isMoviesPage && <button className='movies-card-list__more-button'>Ещё</button>}
    </section>
  );
};

export default MoviesCardList;
