import { useEffect, useState } from 'react';

import { useFormWithValidation } from '../../utils/hooks';
import './SearchForm.css';

const SearchForm = ({
  handleSubmitSearch,
  searchQuery,
  searchCheckboxStatus,
  searchErrorMessage,
}) => {
  const { values, handleChange, isValid } = useFormWithValidation({
    search: searchQuery,
    checkbox: searchCheckboxStatus,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [values.search]);

  useEffect(() => {
    if (searchErrorMessage) {
      setError(searchErrorMessage);
    }
  }, [searchErrorMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) {
      setError('Нужно ввести ключевое слово');
      return;
    }
    setError('');
    handleSubmitSearch(values);
  };

  return (
    <form className='search-form' onSubmit={handleSubmit} noValidate>
      <div className='search-form__container'>
        <div className='search-form__field'>
          <input
            className='search-form__input'
            name='search'
            type='text'
            placeholder='Фильм'
            onChange={handleChange}
            value={values.search}
            required
          />
          <button className='search-form__button' type='submit'></button>
        </div>
        <span className='search-form__error'>{error}</span>

        <div className='search-form__checkbox-container'>
          <label className='search-form__label'>
            <input
              className='search-form__checkbox'
              type='checkbox'
              name='checkbox'
              onChange={handleChange}
              checked={values.checkbox}
            />
            <i className='search-form__control'></i>
            Короткометражки
          </label>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
