import React from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/hooks';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import './Profile.css';

const Profile = ({ handleLogOut, handleUpdateProfile, loggedIn }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [isEditableForm, setIsEditableForm] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const isEditAcceptable =
    isValid && !message && (values.name !== currentUser.name || values.email !== currentUser.email);

  const handleEditProfile = () => {
    setMessage('');
    setIsEditableForm(true);
  };

  const submitForm = (event) => {
    event.preventDefault();

    handleUpdateProfile(values)
      .then(() => {
        setMessage('Данные успешно обновлены.');
        setTimeout(() => setIsEditableForm(false), 3000);
      })
      .catch((error) => {
        if (error.status === 409) {
          setMessage('Пользователь с таким email уже существует.');
        } else {
          setMessage('При обновлении профиля произошла ошибка.');
        }
      });
  };

  return (
    <>
      <MoviesHeader loggedIn={loggedIn} />
      <main className='profile'>
        <div className='profile__container'>
          <h2 className='profile__title'> Привет, {currentUser.name}!</h2>
          <form className='profile__form' onSubmit={submitForm} noValidate>
            <span className={`profile__error ${errors?.name && 'profile__error_visible'}`}>
              {errors.name}
            </span>
            <label className='profile__label'>
              <span className='profile__placeholder'>Имя</span>
              <input
                className='profile__input'
                type='text'
                name='name'
                onChange={handleChange}
                value={values.name}
                disabled={!isEditableForm}
                minLength='2'
                maxLength='30'
              />
            </label>
            <label className='profile__label'>
              <span className='profile__placeholder'>E-mail</span>
              <input
                className='profile__input'
                type='email'
                name='email'
                onChange={handleChange}
                value={values.email}
                disabled={!isEditableForm}
              />
            </label>
            <span className={`profile__error ${errors?.email && 'profile__error_visible'}`}>
              {errors.email}
            </span>

            {isEditableForm ? (
              <>
                <span className='profile__message'>{message}</span>
                <button type='submit' className='profile__save-button' disabled={!isEditAcceptable}>
                  Сохранить
                </button>
              </>
            ) : (
              <>
                <button
                  type='button'
                  className='profile__button profile__button_type_edit'
                  onClick={handleEditProfile}
                >
                  Редактировать
                </button>
                <button
                  type='button'
                  className='profile__button profile__button_type_logout'
                  onClick={handleLogOut}
                >
                  Выйти из аккаунта
                </button>
              </>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default Profile;
