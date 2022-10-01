import photo from '../../images/photo.png';
import Title from '../Title/Title';
import './AboutMe.css';

const AboutMe = () => (
  <section className='about-me'>
    <div className='about-me__container'>
      <Title caption='Студент' />
      <div className='about-me__info'>
        <div className='about-me__text'>
          <h3 className='about-me__name'>Виталий</h3>
          <p className='about-me__profession'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__description'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className='about-me__github'
            href='https://github.com/makafonov'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img src={photo} className='about-me__photo' alt='Фотография.' />
      </div>
    </div>
  </section>
);

export default AboutMe;
