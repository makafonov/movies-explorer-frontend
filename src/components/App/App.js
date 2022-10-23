import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
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
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
