import { useParams } from 'react-router-dom';
import ServiceCard from '../../Components/mini-component/Service';
import { addServiceToCart, fetchServices } from '../../api/connection';
import { useQuery } from 'react-query';
import { Title } from '../../Components/common/Title';
import styles from './Service.module.css';
import { Icon } from '../../Components/common/Icon';
import { ErrorMessage } from '../../utils/notify';
function Services() {
  const { city, category } = useParams<{ city?: string; category?: string }>();
  const pagination = { page: 1, limit: 10 };

  const { data: serviceData } = useQuery('data', () =>
    fetchServices(city, category, pagination)
  );

  const ServiceList = serviceData?.data.data.result;

  const token = sessionStorage.getItem('jwtToken');
  const addToCart = async (serviceId: string, hubId: string) => {
    const data = {
      service_id: serviceId,
      hub_id: hubId,
    };
    await addServiceToCart(data, token)
      .then((res) => console.log(res.data))
      .catch((er) => {
        if (er.response.status === 401) {
          ErrorMessage('You are not authorized');
        } else {
          console.log(er.response.data);
        }
      });
  };

  return (
    <>
      <div className='container'>
        <div className={styles.head}>
          <Title title='Quality Home Services, On Demand' />
          <button className={styles.cart}>
            <Icon icon='cart' />
            View Cart
          </button>
        </div>
        {ServiceList
          ? ServiceList.map((data, index) => {
              return (
                <ServiceCard
                  image={data.image}
                  service={data.name}
                  hub={data.hub.name}
                  location={data.hub.address}
                  description={data.description}
                  time={data.estimated_time}
                  price={data.price}
                  onAddToCart={() => addToCart(data.id, data.hub.id)}
                />
              );
            })
          : null}
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
