import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import routes from '../../routes';
import searchMovies from '../../utils';
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

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate(routes.movies);
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

    mainApi.getUserInfo(jwt).then(({ name, email }) => {
      setCurrentUser({ name, email });
      setLoggedIn(true);
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
          setLoggedIn(true);
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
    localStorage.clear();
    setLoggedIn(false);
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
      moviesApi
        .getMovies()
        .then((data) => {
          setAllMovies(data);
          localStorage.setItem('allMovies', JSON.stringify(data));
        })
        .catch(() => {
          setSearchErrorMessage(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          );
        });
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
                  searchQuery={searchQuery}
                  searchCheckboxStatus={searchCheckboxStatus}
                  searchErrorMessage={searchErrorMessage}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.saved}
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies loggedIn={loggedIn} />
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
