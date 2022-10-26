import Title from '../Title/Title';
import './AboutProject.css';

const AboutProject = () => (
  <section className='about-project'>
    <div className='about-project__container'>
      <Title caption='О проекте' />
      <div className='about-project__description'>
        <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
        <p className='about-project__text'>
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
          доработки.
        </p>
        <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
        <p className='about-project__text'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
          защититься.
        </p>
      </div>
      <div className='about-project__timeline'>
        <p className='about-project__timeline-part about-project__timeline-graph about-project__timeline-1week'>
          1 неделя
        </p>
        <p className='about-project__timeline-part about-project__timeline-graph about-project__timeline-rest'>
          4 недели
        </p>
        <p className='about-project__timeline-part about-project__timeline-text'>Back-end</p>
        <p className='about-project__timeline-part about-project__timeline-text'>Front-end</p>
      </div>
    </div>
  </section>
);

export default AboutProject;
