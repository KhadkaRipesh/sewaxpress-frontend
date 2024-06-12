/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router-dom';
import ServiceCard from '../../Components/mini-component/Service';
import {
  addServiceToCart,
  bookService,
  createChatRoom,
  deleteCart,
  deleteCartService,
  fetchServices,
  getCart,
  sessionUser,
} from '../../api/connection';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Title } from '../../Components/common/Title';
import styles from './Service.module.css';
import { Icon } from '../../Components/common/Icon';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
import React, { useEffect, useState } from 'react';
import { DatePicker, DatePickerProps, Modal } from 'antd';
import CartItem from '../../Components/mini-component/CartItem';

interface FarePrice {
  label: string;
  value: number;
}

function Services() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // extracting city and category from url
  const { city, category } = useParams<{ city?: string; category?: string }>();

  // use state for fare prices
  const [farePrices, setFarePrices] = useState<FarePrice[]>([]);
  const [farePrice, setFarePrice] = useState();
  const [fareChange, setFareChange] = useState(0);

  const { data: serviceData } = useQuery('services', () =>
    fetchServices(city, category)
  );
  const ServiceList = serviceData?.data.data;
  console.log(ServiceList, 'This is services');

  const session = localStorage.getItem('jwtToken');

  const { data: userInfo } = useQuery('users', () =>
    sessionUser(session)
      .then((res) => {
        return res.data.data;
      })
      .catch((error) => {
        if (error) {
          localStorage.removeItem('jwtToken');
          // navigate('/login');
        }
      })
  );

  const { data: cartData } = useQuery(session ? 'cartServices' : '', () =>
    session ? getCart(session) : null
  );
  const cartItems = cartData?.data.data.cart_services;
  const cart = cartData?.data.data;
  useEffect(() => {
    calculateFarePrices(cart?.grand_total);
  }, [cart]);

  // Function to calculate fare prices based on grand total
  const calculateFarePrices = (total: string) => {
    const grandTotal = parseFloat(total);
    const discount15Percent = grandTotal * 0.15;
    const discount10Percent = grandTotal * 0.1;
    const surcharge10Percent = grandTotal * 0.1;

    // Set the calculated prices to the state
    setFarePrices([
      {
        label: '-15%',
        value: grandTotal - discount15Percent,
      },
      {
        label: '-10%',
        value: grandTotal - discount10Percent,
      },
      {
        label: '0%',
        value: grandTotal,
      },
      {
        label: '+10%',
        value: grandTotal + surcharge10Percent,
      },
    ]);
  };

  // Function to handle selecting a fare
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectFare = (fare: any | React.SetStateAction<undefined>) => {
    setFareChange(fare - cart.grand_total);
    setFarePrice(fare);
    setBookData({ ...bookData, after_fare_price: fare });
  };

  // state for modal
  const [isModalOpen, setModalOpen] = useState(false);

  // state for switching modal content
  const [mode, setMode] = useState('cart');

  // states for booking service
  const [bookData, setBookData] = useState({
    after_fare_price: 1,
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
      console.log(date);
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
        setFareChange(0);
      })
      .catch((err) => console.log(err.response));
  };

  // to start chat
  const chatToHubMutation = useMutation((params: { hub_id: string }) => {
    const { hub_id } = params;
    const data = { hub_id: hub_id, customer_id: userInfo ? userInfo.id : '' };
    return createChatRoom(data, session)
      .then((res) => {
        navigate(`/messages?roomId=${res.data.data.id}`);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          ErrorMessage('Please Login to Continue');
        } else {
          ErrorMessage(err.response.data.message);
        }
      });
  });
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
                    cartItems.map(
                      (data: {
                        id: string;
                        service: {
                          image: string;
                          name: string;
                          price: any;
                          id: string;
                        };
                      }) => {
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
                      }
                    )
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
                  <div className={styles.box_style}>
                    <h3 className={styles.inner}>Summary</h3>

                    <table className={styles.table}>
                      <tbody>
                        <tr>
                          <td>Service Cost</td>
                          <td style={{ textAlign: 'end' }}>{cart.sub_total}</td>
                        </tr>
                        <tr>
                          <td>Discount Cost</td>
                          <td style={{ textAlign: 'end' }}>
                            {cart.discount_amount}
                          </td>
                        </tr>
                        <tr>
                          <td>Tax Amount</td>
                          <td style={{ textAlign: 'end' }}>
                            {cart.tax_amount}
                          </td>
                        </tr>
                        {farePrice ? (
                          <tr>
                            <td>Fare Price</td>
                            <td style={{ textAlign: 'end' }}>{fareChange}</td>
                          </tr>
                        ) : null}
                        <tr>
                          <td>Grand Total</td>
                          <td style={{ textAlign: 'end' }}>
                            {`Rs: ${cart.grand_total + fareChange}`}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <label>Fare Price</label>
                  <br />
                  <div className={styles.bid}>
                    {farePrices.map((price, index) => (
                      <button
                        key={index}
                        className={styles.button_bid}
                        onClick={() => handleSelectFare(price.value)}
                      >
                        {price.value}
                      </button>
                    ))}
                  </div>
                  <br />

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
                    Request for Book
                  </button>
                </>
              )}
            </Modal>
          )}
        </div>
        {ServiceList ? (
          ServiceList.map(
            (data: {
              service_id: string;
              service_image: string;
              service_name: string;
              hub_name: string;
              hub_id: string;
              hub_address: string;
              service_description: string;
              service_estimated_time: string;
              service_price: any;
              avg_rating: any;
              rating_count: string;
            }) => {
              return (
                <ServiceCard
                  key={data.service_id}
                  image={data.service_image}
                  service={data.service_name}
                  hub={data.hub_name}
                  location={data.hub_address}
                  description={data.service_description}
                  time={data.service_estimated_time}
                  price={data.service_price}
                  rate={
                    data.avg_rating
                      ? parseFloat(data.avg_rating).toFixed(1)
                      : '0'
                  }
                  count={data.rating_count}
                  onAddToCart={() =>
                    addCartServiceMutation.mutate({
                      service_id: data.service_id,
                      hub_id: data.hub_id,
                    })
                  }
                  chatToHub={() =>
                    chatToHubMutation.mutate({
                      hub_id: data.hub_id,
                    })
                  }
                />
              );
            }
          )
        ) : (
          <p className={styles.null}>No services available for this address.</p>
        )}
      </div>
    </>
  );
}

export default Services;
