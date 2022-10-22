import './MoviesCard.css';

const MoviesCard = ({ movie }) => (
  <li className='movies-card'>
    <img className='movies-card__image' src={movie.image} alt={movie.nameRu} />
    <div className='movies-card__container'>
      <h3 className='movies-card__title'>{movie.nameRu}</h3>
      <p className='movies-card__duration'>{movie.duration}</p>
      <button className='movies-card__save-button' type='button' />
    </div>
  </li>
);

export default MoviesCard;
