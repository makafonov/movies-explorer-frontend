import './Title.css';

const Title = ({ caption, low }) => (
  <h2 className={`title ${low ? 'title_low' : ''}`}>{caption}</h2>
);

export default Title;
