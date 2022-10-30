import React from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import './Profile.css';

const Profile = () => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <MoviesHeader />
      <main className='profile'>
        <div className='profile__container'>
          <h2 className='profile__title'> Привет, {currentUser.name}!</h2>
          <form className='profile__form' noValidate>
            <label className='profile__label'>
              <span className='profile__placeholder'>Имя</span>
              <input className='profile__input' type='text' name='name' value={currentUser.name} />
            </label>
            <label className='profile__label'>
              <span className='profile__placeholder'>E-mail</span>
              <input
                className='profile__input'
                type='email'
                name='email'
                value={currentUser.email}
              />
            </label>
          </form>
          <button type='submit' className='profile__button profile__button_type_edit'>
            Редактировать
          </button>
          <button type='button' className='profile__button profile__button_type_logout'>
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </>
  );
};

export default Profile;
