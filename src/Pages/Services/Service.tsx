import { useParams } from 'react-router-dom';
import styles from './Service.module.css';
function Services() {
  const { city, category } = useParams<{ city?: string; category?: string }>();

  return (
    <>
      <div className='container'>
        Service Lists
        <div className={styles.filter}>
          <p>Fiter from Cityname: {city}</p>
          <p>Filter from Category: {category}</p>
        </div>
      </div>
    </>
  );
}

export default Services;
