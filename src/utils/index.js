const searchMovies = (movies, query, isShortFilm) => {
  let result = movies;
  if (isShortFilm) {
    result = movies.filter((movie) => movie.duration < 40);
  }

  return result.filter((movie) => movie.nameRU.toLowerCase().includes(query.toLowerCase()));
};

export default searchMovies;
