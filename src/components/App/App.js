import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import routes from '../../routes';
import mainApi from '../../utils/MainApi';
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
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate(routes.movies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

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
        setServerErrorMessage(
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
        setServerErrorMessage(
          error.status === 409
            ? 'Пользователь с таким email уже существует.'
            : 'При регистрации пользователя произошла ошибка.'
        );
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route path={routes.home} element={<Main loggedIn={loggedIn} />} />
          <Route
            path={routes.movies}
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies loggedIn={loggedIn} />
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
            element={
              <Register handleSignUp={handleSignUp} serverErrorMessage={serverErrorMessage} />
            }
          />
          <Route
            path={routes.signin}
            element={<Login handleSighIn={handleSignIn} serverErrorMessage={serverErrorMessage} />}
          />
          <Route path={routes.rest} element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
