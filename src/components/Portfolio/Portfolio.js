import './Portfolio.css';

const Portfolio = () => (
  <section className='portfolio'>
    <section className='portfolio__container'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__links'>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://github.com/makafonov/how-to-learn'
            target='_blank'
            rel='noreferrer'
          >
            Статичный сайт
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://github.com/makafonov/russian-travel'
            target='_blank'
            rel='noreferrer'
          >
            Адаптивный сайт
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://github.com/makafonov/react-mesto-api-full'
            target='_blank'
            rel='noreferrer'
          >
            Одностраничное приложение
            <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
      </ul>
    </section>
  </section>
);

export default Portfolio;
