import { useParams } from 'react-router-dom';
import ServiceCard from '../../Components/mini-component/Service';
import {
  addServiceToCart,
  deleteCartService,
  fetchServices,
  getCart,
} from '../../api/connection';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { Title } from '../../Components/common/Title';
import styles from './Service.module.css';
import { Icon } from '../../Components/common/Icon';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
import { useState } from 'react';
import { Modal } from 'antd';
import CartItem from '../../Components/mini-component/CartItem';
function Services() {
  const { city, category } = useParams<{ city?: string; category?: string }>();
  const pagination = { page: 1, limit: 10 };

  const { data: serviceData } = useQuery('services', () =>
    fetchServices(city, category, pagination)
  );
  const ServiceList = serviceData?.data.data.result;

  const session = sessionStorage.getItem('jwtToken');
  const { data: cartData } = useQuery('cartServices', () => getCart(session));
  const cartItems = cartData?.data.data.cart_services;

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const token = sessionStorage.getItem('jwtToken');
  const addToCart = async (serviceId: string, hubId: string) => {
    const data = {
      service_id: serviceId,
      hub_id: hubId,
    };
    await addServiceToCart(data, token)
      .then((res) => SuccessMessage(res.data.message))
      .catch((er) => {
        if (er.response.status === 401) {
          ErrorMessage('You are not authorized');
        } else {
          ErrorMessage(er.response.data.message);
        }
      });
  };

  const deleteCartServiceMutation = useMutation(
    (service_id: string) => {
      return deleteCartService(service_id, token);
    },
    {
      onSuccess: () => {
        SuccessMessage('Service removed from Cart.');
      },
    }
  );
  return (
    <>
      <div className='container'>
        <div className={styles.head}>
          <Title title='Quality Home Services, On Demand' />
          <button className={styles.cart} onClick={openModal}>
            <Icon icon='cart' />
            View Cart
          </button>
          {isModalOpen && (
            <Modal
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              className='modalStyle'
            >
              <h2>Your Carts</h2>
              {cartItems
                ? cartItems.map((data) => {
                    return (
                      <CartItem
                        key={data.id}
                        image={data.service.image}
                        service={data.service.name}
                        price={data.service.price}
                        onDelete={() =>
                          deleteCartServiceMutation.mutate(data.service.id)
                        }
                      />
                    );
                  })
                : null}
            </Modal>
          )}
        </div>
        {ServiceList
          ? ServiceList.map((data) => {
              return (
                <ServiceCard
                  key={data.id}
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
