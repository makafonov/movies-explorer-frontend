import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

const Movies = ({ loggedIn }) => (
  <>
    <MoviesHeader loggedIn={loggedIn} />
    <main className='movies'>
      <SearchForm />
      <MoviesCardList movies={[]} />
    </main>
    <Footer />
  </>
);

export default Movies;
