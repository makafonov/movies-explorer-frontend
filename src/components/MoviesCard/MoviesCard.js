import { useLocation } from 'react-router-dom';

import routes from '../../routes';
import './MoviesCard.css';

const MoviesCard = ({ movie }) => {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === routes.saved;
  const buttonClassName = `movies-card__button ${
    isSavedMoviesPage ? 'movies-card__button_type_delete' : 'movies-card__button_type_save'
  }`;

  return (
    <li className='movies-card'>
      <img className='movies-card__image' src={movie.image} alt={movie.nameRu} />
      <div className='movies-card__container'>
        <h3 className='movies-card__title'>{movie.nameRu}</h3>
        <p className='movies-card__duration'>{movie.duration}</p>
        <button className={buttonClassName} type='button' />
      </div>
    </li>
  );
};

export default MoviesCard;
