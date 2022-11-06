import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import routes from '../../routes';
import { normalizeMovies, searchMovies } from '../../utils';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [authErrorMessage, setAuthErrorMessage] = useState('');

  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) ?? null);
  const [foundMovies, setFoundMovies] = useState(
    JSON.parse(localStorage.getItem('foundMovies')) ?? []
  );
  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem('savedMovies')) ?? []
  );
  const [searchErrorMessage, setSearchErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') ?? '');
  const [searchCheckboxStatus, setSearchCheckboxStatus] = useState(
    JSON.parse(localStorage.getItem('searchCheckboxStatus')) ?? false
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate(routes.movies);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }

    mainApi
      .getUserInfo(jwt)
      .then(({ name, email }) => {
        setCurrentUser({ name, email });
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleSignIn = (email, password) => {
    mainApi
      .signIn({ email, password })
      .then((data) => {
        const jwt = data.token;
        if (jwt) {
          localStorage.setItem('jwt', jwt);
          tokenCheck();
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
    setLoggedIn(false);
    setSearchQuery('');
    setSearchCheckboxStatus(false);
    setFoundMovies([]);
    setSavedMovies([]);
    localStorage.clear();

    navigate(routes.main);
  };

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
                  movies={savedMovies}
                  handleMoviesCardButtonClick={handleMoviesCardButtonClick}
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
            element={<Register handleSignUp={handleSignUp} authErrorMessage={authErrorMessage} />}
          />
          <Route
            path={routes.signin}
            element={<Login handleSighIn={handleSignIn} authErrorMessage={authErrorMessage} />}
          />
          <Route path={routes.rest} element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
