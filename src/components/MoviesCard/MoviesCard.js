import { useLocation } from 'react-router-dom';

import routes from '../../routes';
import './MoviesCard.css';

const MoviesCard = ({ movie, isSavedMovie, handleMoviesCardButtonClick }) => {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === routes.saved;
  const buttonClassName = `movies-card__button ${
    isSavedMoviesPage
      ? 'movies-card__button_type_delete'
      : `${isSavedMovie ? 'movies-card__button_type_saved' : 'movies-card__button_type_save'}`
  }`;

  return (
    <li className='movies-card'>
      <a href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img className='movies-card__image' src={movie.image} alt={movie.nameRu} />
      </a>
      <div className='movies-card__container'>
        <h3 className='movies-card__title'>{movie.nameRU}</h3>
        <p className='movies-card__duration'>{movie.duration}</p>
        <button
          className={buttonClassName}
          type='button'
          onClick={() => handleMoviesCardButtonClick(movie)}
        />
      </div>
    </li>
  );
};

export default MoviesCard;
