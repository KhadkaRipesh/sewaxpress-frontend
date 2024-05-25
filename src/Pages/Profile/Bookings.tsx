import { useQuery } from 'react-query';
import { BookingQuery, getMyBookings, reviewHub } from '../../api/connection';
import { Button, Flex, Modal, Rate, Space, Table } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Booking.module.css';
import TextArea from 'antd/es/input/TextArea';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';

function MyBookings() {
  type Review = {
    rating: number;
    comment: string;
  };
  const navigate = useNavigate();
  const query: BookingQuery = {
    // book_status: 'BOOKING_PLACED',
    // date: 'LAST_30_DAYS',
    // start_date: null,
    // end_date: null,
  };

  // state  for modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [hubToRate, setHubToRate] = useState('');
  const [hubIdToRate, setHubIdToRate] = useState('');
  const openModal = () => {
    setModalOpen(true);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  const [review, setReview] = useState<Review>({
    rating: 1,
    comment: '',
  });

  // columns for table
  const columns = [
    {
      title: 'Book Date',
      dataIndex: 'booking_date',
      key: 'date',
      render: (booking_date: moment.MomentInput) =>
        moment(booking_date).format('YYYY-MM-DD'),
    },

    {
      title: 'Booked Services',
      dataIndex: 'booked_services',
      key: 'booked_service',
      render: (
        booked_services: {
          id: string;
          price: string;
          service: { id: string; name: string };
        }[]
      ) => (
        <span>
          {booked_services.map((service, index) => (
            <span key={service.id}>
              {service.service.name}
              {index !== booked_services.length - 1 && ', '}{' '}
              {/* Add comma if not the last service */}
            </span>
          ))}
        </span>
      ),
    },
    {
      title: 'Booked From',
      dataIndex: 'hub',
      key: 'hub',
      render: (hub: { id: string; name: string }) => hub.name,
    },

    {
      title: 'Total Price',
      dataIndex: 'grand_total',
      key: 'price',
      render: (grand_total: string) => `Rs. ${grand_total}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: { id: string }) => (
        <Space size='middle'>
          <Button onClick={() => viewStatus(record.id)}>View More</Button>
        </Space>
      ),
    },
    {
      title: 'Rate',
      key: 'action',
      render: (record: { hub: { id: string; name: string } }) => (
        <Space size='middle'>
          <Button onClick={() => rateHub(record.hub)}>Rate Hubs</Button>
        </Space>
      ),
    },
  ];

  //   fetch my bookings
  const session = localStorage.getItem('jwtToken');
  const { data: services } = useQuery('myService', () =>
    getMyBookings(query, session)
      .then((res) => res)
      .catch((e) => console.log(e.response))
  );
  const data = services?.data.data;

  // navigate to booking detail page
  const viewStatus = (id: string) => {
    navigate(`/book/${id}`);
  };

  const rateHub = (hub: { id: string; name: string }) => {
    openModal();
    setHubToRate(hub.name);
    setHubIdToRate(hub.id);
  };

  // function to handle rating of hub
  const handleRating = () => {
    reviewHub(hubIdToRate, review, session)
      .then((res) => SuccessMessage(res.data.message))
      .catch((e) => ErrorMessage(e.response.data.message));
  };

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey='id' />
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          className='modalStyle'
        >
          <h2 className={styles.h2}>
            Rate <span>'{hubToRate}'</span>
          </h2>

          <br />

          <Flex gap='middle' vertical>
            <Rate
              className={styles.icons}
              onChange={(e) => {
                setReview({ ...review, rating: e });
              }}
              value={review.rating}
            />
          </Flex>

          <br />
          <TextArea
            rows={3}
            placeholder='Write a comment here.'
            maxLength={100}
            onChange={(event) =>
              setReview({ ...review, comment: event?.target.value })
            }
          />

          <button
            className={styles.rate}
            onClick={() => {
              handleCancel();
              handleRating();
            }}
          >
            Rate Hub
          </button>
        </Modal>
      )}
    </>
  );
}

export default MyBookings;
