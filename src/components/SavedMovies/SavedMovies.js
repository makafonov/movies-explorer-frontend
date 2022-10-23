import movies from '../../utils/consts';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

const SavedMovies = () => (
  <>
    <MoviesHeader />
    <main className='movies'>
      <div className='movies__container'>
        <SearchForm />
        <MoviesCardList movies={movies.slice(0, 3)} />
      </div>
    </main>
    <Footer />
  </>
);

export default SavedMovies;
