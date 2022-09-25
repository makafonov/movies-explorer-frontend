import './Promo.css';

const Promo = () => (
  <section className='promo'>
    <div className='promo__container'>
      <div className='promo__info'>
        <div className='promo__main-text'>
          <h1 className='promo__title'>
            Учебный проект студента факультета <span className='promo__nowrap'>Веб-разработки</span>.
          </h1>
          <p className='promo__subtitle'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <div className='promo__illustration'></div>
      </div>
      <button className='promo__button'>Узнать больше</button>
    </div>
  </section>
);

export default Promo
