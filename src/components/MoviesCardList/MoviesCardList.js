import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ movies }) => (
  <section className='movies-card-list'>
    <ul className='movies-card-list__container'>
      {movies.map((movie) => (
        <MoviesCard key={movie.id} movie={movie} />
      ))}
    </ul>
    <button className='movies-card-list__more-button'>Ещё</button>
  </section>
);

export default MoviesCardList;
