import { useParams } from 'react-router-dom';
import ServiceCard from '../../Components/mini-component/Service';
import {
  addServiceToCart,
  bookService,
  deleteCart,
  deleteCartService,
  fetchServices,
  getCart,
} from '../../api/connection';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Title } from '../../Components/common/Title';
import styles from './Service.module.css';
import { Icon } from '../../Components/common/Icon';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
import React, { useState } from 'react';
import { DatePicker, DatePickerProps, Modal } from 'antd';
import CartItem from '../../Components/mini-component/CartItem';
function Services() {
  const queryClient = useQueryClient();
  // extracting city and category from url
  const { city, category } = useParams<{ city?: string; category?: string }>();
  const pagination = { page: 1, limit: 10 };

  const { data: serviceData } = useQuery('services', () =>
    fetchServices(city, category, pagination)
  );
  const ServiceList = serviceData?.data.data.result;

  const session = localStorage.getItem('jwtToken');
  const { data: cartData } = useQuery(session ? 'cartServices' : '', () =>
    session ? getCart(session) : null
  );
  const cartItems = cartData?.data.data.cart_services;
  // state for modal
  const [isModalOpen, setModalOpen] = useState(false);

  // state for switching modal content
  const [mode, setMode] = useState('cart');

  // states for booking service
  const [bookData, setBookData] = useState({
    booking_date: '',
    booking_address: '',
  });

  const handleBookdata = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setBookData({ ...bookData, [field]: event.target.value });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const addCartServiceMutation = useMutation(
    (params: { service_id: string; hub_id: string }) => {
      const { service_id, hub_id } = params;
      const data = {
        service_id: service_id,
        hub_id: hub_id,
      };
      return addServiceToCart(data, session)
        .then((res) => {
          SuccessMessage(res.data.message);
          queryClient.invalidateQueries(['cartServices']);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            ErrorMessage('Please Login to Continue');
          } else {
            ErrorMessage(err.response.data.message);
          }
        });
    }
  );

  const deleteCartMutation = useMutation(
    (jwt: string | null) => {
      return deleteCart(jwt);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cartServices']);
      },
    }
  );

  const deleteCartServiceMutation = useMutation(
    (service_id: string) => {
      return deleteCartService(service_id, session);
    },
    {
      onSuccess: () => {
        SuccessMessage('Service removed from Cart.');
        queryClient.invalidateQueries(['cartServices']);
      },
    }
  );
  // for datepicker
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (typeof dateString === 'string') {
      setBookData({ ...bookData, booking_date: dateString });
    }
  };

  // book service
  const book = () => {
    bookService(bookData, session)
      .then((res) => {
        SuccessMessage(res.data.message);
        setModalOpen(false);
        deleteCartMutation.mutate(session);
      })
      .catch((err) => ErrorMessage('Please fill all field.'));
  };
  return (
    <>
      <div className='container'>
        <div className={styles.head}>
          <Title title='Quality Home Services, On Demand' />
          <button
            className={styles.cart}
            onClick={() => {
              openModal(), setMode('cart');
            }}
          >
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
              {/* show cart at first when view cart is displayed */}
              {mode === 'cart' && (
                <>
                  <h2 className={styles.title}>Your Cart</h2>
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((data) => {
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
                  ) : (
                    <p className={styles.null}>No services added on Cart.</p>
                  )}
                  {/*if there is services on cart show proceed button*/}
                  {cartItems && cartItems.length > 0 && (
                    <>
                      <button
                        className={styles.proceed}
                        onClick={() => setMode('book')}
                      >
                        Proceed
                      </button>
                    </>
                  )}
                </>
              )}
              {/* if user clicks procced from cart list display booking modal */}
              {mode === 'book' && (
                <>
                  <h2 className={styles.title}>Make a Book</h2>
                  <label>Booking Date</label>
                  <br />
                  <DatePicker
                    className={styles.picker}
                    format={{
                      format: 'YYYY-MM-DD',
                      type: 'mask',
                    }}
                    onChange={onChange}
                  />

                  <label>Booking Address</label>
                  <br />
                  <input
                    className={styles.address}
                    type='text'
                    name='booking_address'
                    id='booking_address'
                    placeholder='Enter your address'
                    onChange={(e) => handleBookdata(e, 'booking_address')}
                    required
                  />
                  <br />
                  <button className={styles.proceed} onClick={book}>
                    Book
                  </button>
                </>
              )}
            </Modal>
          )}
        </div>
        {ServiceList ? (
          ServiceList.map((data) => {
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
                onAddToCart={() =>
                  addCartServiceMutation.mutate({
                    service_id: data.id,
                    hub_id: data.hub.id,
                  })
                }
              />
            );
          })
        ) : (
          <p className={styles.null}>No services available for this address.</p>
        )}
      </div>
    </>
  );
}

export default Services;
