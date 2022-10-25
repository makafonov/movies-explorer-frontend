import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import routes from '../../routes';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    setCurrentUser({ name: 'Виталий', email: 'pochta@yandex.ru' });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route path={routes.home} element={<Main />} />
          <Route path={routes.movies} element={<Movies />} />
          <Route path={routes.saved} element={<SavedMovies />} />
          <Route path={routes.profile} element={<Profile />} />
          <Route path={routes.signup} element={<Register />} />
          <Route path={routes.signin} element={<Login />} />
          <Route path={routes.rest} element={<NotFound /> } />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
