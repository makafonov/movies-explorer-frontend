import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ movies }) => {
  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__container'>
        {movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}
      </ul>
      {isMoviesPage && <button className='movies-card-list__more-button'>Ещё</button>}
    </section>
  );
};

export default MoviesCardList;
