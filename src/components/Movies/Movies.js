import movies from '../../utils/consts';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

const Movies = () => (
  <>
    <MoviesHeader />
    <main className='movies'>
      <div className='movies__container'>
        <SearchForm />
        <MoviesCardList movies={movies.slice(0, 8)} />
      </div>
    </main>
    <Footer />
  </>
);

export default Movies;
