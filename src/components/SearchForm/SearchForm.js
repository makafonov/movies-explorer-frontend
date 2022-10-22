import './SearchForm.css';

const SearchForm = () => (
  <form className='search-form'>
    <div className='search-form__field'>
      <input className='search-form__input' type='text' placeholder='Фильм' />
      <button className='search-form__button' type='submit'></button>
    </div>

    <div className='search-form__checkbox-container'>
      <label className='search-form__label'>
        <input className='search-form__checkbox' type='checkbox' />
        <i className='search-form__control'></i>
        Короткометражки
      </label>
    </div>
  </form>
);

export default SearchForm;
