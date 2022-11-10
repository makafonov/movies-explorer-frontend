import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProvideAuth } from '../../contexts/ProvideAuth';
import routes from '../../routes';
import { normalizeMovies, searchMovies } from '../../utils';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import GuestRoute from '../GuestRoute/GuestRoute';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) ?? null);
  const [foundMovies, setFoundMovies] = useState(
    JSON.parse(localStorage.getItem('foundMovies')) ?? []
  );
  const [searchErrorMessage, setSearchErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') ?? '');
  const [searchCheckboxStatus, setSearchCheckboxStatus] = useState(
    JSON.parse(localStorage.getItem('searchCheckboxStatus')) ?? false
  );

  const [savedMovies, setSavedMovies] = useState([]);
  const [foundMoviesSaved, setFoundMoviesSaved] = useState(null);
  const [searchQuerySaved, setSearchQuerySaved] = useState('');
  const [searchCheckboxStatusSaved, setSearchCheckboxStatusSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('searchCheckboxStatus', searchCheckboxStatus);
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
  }, [searchQuery, searchCheckboxStatus, foundMovies]);

  useEffect(() => {
    if (allMovies) {
      setFoundMovies(searchMovies(allMovies, searchQuery, searchCheckboxStatus));
    }
  }, [searchQuery, searchCheckboxStatus, allMovies]);

  useEffect(() => {
    if (savedMovies) {
      setFoundMoviesSaved(searchMovies(savedMovies, searchQuerySaved, searchCheckboxStatusSaved));
    }
  }, [searchQuerySaved, searchCheckboxStatusSaved, savedMovies]);

  const handleSubmitSearch = ({ search, checkbox }) => {
    setSearchQuery(search);
    setSearchCheckboxStatus(checkbox);

    if (!allMovies) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((data) => {
          const movies = normalizeMovies(data);
          setAllMovies(movies);
          localStorage.setItem('allMovies', JSON.stringify(movies));
        })
        .catch(() => {
          setSearchErrorMessage(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleSubmitSearchSaved = ({ search, checkbox }) => {
    setSearchQuerySaved(search);
    setSearchCheckboxStatusSaved(checkbox);
  };

  const cleanUpState = () => {
    localStorage.clear();

    setSearchQuery('');
    setSearchCheckboxStatus(false);
    setSearchQuerySaved('');
    setSearchCheckboxStatusSaved(false);
    setAllMovies(null);
    setFoundMovies([]);
    setFoundMoviesSaved([]);
    setSavedMovies([]);
  };

  const cleanUpSearchResult = () => {
    setSearchQuerySaved('');
    setSearchCheckboxStatusSaved(false);
    setFoundMoviesSaved(null);
  };

  const handleSaveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }

    mainApi
      .saveMovie(jwt, movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }

    mainApi
      .deleteMovie(jwt, movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((deletedMovie) => deletedMovie._id !== movie._id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMoviesCardButtonClick = (movie) => {
    const isEqualMovie = (savedMovie) => savedMovie.movieId === movie.movieId;
    if (savedMovies.some(isEqualMovie)) {
      handleDeleteMovie(savedMovies.find(isEqualMovie));
    } else {
      handleSaveMovie(movie);
    }
  };

  return (
    <ProvideAuth>
      <div className='page'>
        <Routes>
          <Route path={routes.home} element={<Main />} />
          <Route
            path={routes.movies}
            element={
              <ProtectedRoute>
                <Movies
                  handleSubmitSearch={handleSubmitSearch}
                  movies={foundMovies}
                  setSavedMovies={setSavedMovies}
                  savedMovies={savedMovies}
                  searchQuery={searchQuery}
                  searchCheckboxStatus={searchCheckboxStatus}
                  searchErrorMessage={searchErrorMessage}
                  handleMoviesCardButtonClick={handleMoviesCardButtonClick}
                  isLoading={isLoading}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.saved}
            element={
              <ProtectedRoute>
                <SavedMovies
                  handleSubmitSearch={handleSubmitSearchSaved}
                  movies={foundMoviesSaved !== null ? foundMoviesSaved : savedMovies}
                  searchQuerySaved={searchQuerySaved}
                  searchCheckboxStatusSaved={searchCheckboxStatusSaved}
                  handleMoviesCardButtonClick={handleMoviesCardButtonClick}
                  cleanUpSearchResult={cleanUpSearchResult}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.profile}
            element={
              <ProtectedRoute>
                <Profile cleanUpState={cleanUpState} />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.signup}
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path={routes.signin}
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route path={routes.rest} element={<NotFound />} />
        </Routes>
      </div>
    </ProvideAuth>
  );
};

export default App;
