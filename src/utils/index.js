import { MOVIES_URL } from '../consts';

const searchMovies = (movies, query, isShortFilm) => {
  let result = movies;
  if (isShortFilm) {
    result = movies.filter((movie) => movie.duration < 40);
  }

  return result.filter((movie) => movie.nameRU.toLowerCase().includes(query.toLowerCase()));
};

const normalizeMovies = (movies) =>
  movies.map((movie) => ({
    movieId: movie.id,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    trailerLink: movie.trailerLink,
    image: `${MOVIES_URL}/${movie.image.url}`,
    thumbnail: `${MOVIES_URL}/${movie.image.formats.thumbnail.url}`,
  }));

export { searchMovies, normalizeMovies };
