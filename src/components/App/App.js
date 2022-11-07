import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import routes from '../../routes';
import { normalizeMovies, searchMovies } from '../../utils';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import AnonymousRoute from '../AnonymousRoute/AnonymousRoute';
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
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [authErrorMessage, setAuthErrorMessage] = useState('');

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
    if (loggedIn) {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        return;
      }

      mainApi
        .getSavedMovies(jwt)
        .then((movies) => {
          setSavedMovies(movies);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

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

  const handleSignIn = (email, password) => {
    mainApi
      .signIn({ email, password })
      .then((data) => {
        const jwt = data.token;
        if (jwt) {
          localStorage.setItem('jwt', jwt);
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        setAuthErrorMessage(
          error.status === 401
            ? 'Вы ввели неправильный логин или пароль.'
            : 'При авторизации произошла ошибка.'
        );
      });
  };

  const handleSignUp = (email, password, name) => {
    mainApi
      .signUp({ email, password, name })
      .then((data) => {
        if (data) {
          handleSignIn(email, password);
        }
      })
      .catch((error) => {
        setAuthErrorMessage(
          error.status === 409
            ? 'Пользователь с таким email уже существует.'
            : 'При регистрации пользователя произошла ошибка.'
        );
      });
  };

  const handleLogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setSearchQuery('');
    setSearchCheckboxStatus(false);
    setSearchQuerySaved('');
    setSearchCheckboxStatusSaved(false);
    setAllMovies(null);
    setFoundMovies([]);
    setFoundMoviesSaved([]);
    setSavedMovies([]);

    navigate(routes.main);
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch(() => {
          handleLogOut();
        });
    } else {
      setLoggedIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleUpdateProfile = (profileData) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return undefined;
    }

    return mainApi.updateUserInfo(jwt, profileData).then((data) => {
      setCurrentUser(data);
    });
  };

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

  const cleanupSearchResult = () => {
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
    if (savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId)) {
      handleDeleteMovie(savedMovies.find((savedMovie) => savedMovie.movieId === movie.movieId));
    } else {
      handleSaveMovie(movie);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route path={routes.home} element={<Main loggedIn={loggedIn} />} />
          <Route
            path={routes.movies}
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  loggedIn={loggedIn}
                  handleSubmitSearch={handleSubmitSearch}
                  movies={foundMovies}
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
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  loggedIn={loggedIn}
                  handleSubmitSearch={handleSubmitSearchSaved}
                  movies={foundMoviesSaved !== null ? foundMoviesSaved : savedMovies}
                  searchQuerySaved={searchQuerySaved}
                  searchCheckboxStatusSaved={searchCheckboxStatusSaved}
                  handleMoviesCardButtonClick={handleMoviesCardButtonClick}
                  cleanupSearchResult={cleanupSearchResult}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.profile}
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  handleLogOut={handleLogOut}
                  handleUpdateProfile={handleUpdateProfile}
                  loggedIn={loggedIn}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.signup}
            element={
              <AnonymousRoute loggedIn={loggedIn}>
                <Register handleSignUp={handleSignUp} authErrorMessage={authErrorMessage} />
              </AnonymousRoute>
            }
          />
          <Route
            path={routes.signin}
            element={
              <AnonymousRoute loggedIn={loggedIn}>
                <Login handleSighIn={handleSignIn} authErrorMessage={authErrorMessage} />
              </AnonymousRoute>
            }
          />
          <Route path={routes.rest} element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
