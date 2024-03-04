import { useParams } from 'react-router-dom';
import styles from './Service.module.css';
import ServiceCard from '../../Components/mini-component/Service';

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
        <ServiceCard
          service='Mens Saloon'
          hub='Udit Hair Cutting'
          description='We cut hair on chep price on your home.'
          time=' 1 hr 20 min'
          price='250'
        />
      </div>
    </>
  );
}

export default Services;
