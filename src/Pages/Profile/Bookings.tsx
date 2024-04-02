import { useQuery } from 'react-query';
import { BookingQuery, getMyBookings } from '../../api/connection';
import { Badge, Button, Space, Table } from 'antd';
import moment from 'moment';

function MyBookings() {
  const query: BookingQuery = {
    book_status: 'BOOKING_PLACED',
    date: 'LAST_30_DAYS',
    start_date: null,
    end_date: null,
  };

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
      title: 'Book Status',
      dataIndex: 'book_status',
      key: 'name',
      render: (text: string) => {
        let badgeStatus = 'default';

        // Determine badge status and text based on specific conditions
        if (text === 'BOOKING_PLACED') {
          badgeStatus = 'processing';
        } else if (text === 'BOOKING_CONFIRMED') {
          badgeStatus = 'success';
        } else if (text === 'BOOKING_CANCELLED') {
          badgeStatus = 'error';
        }

        return (
          <div style={{ border: '1px solid #f0f0f0', padding: '5px' }}>
            <Badge status={badgeStatus} text={text} />
          </div>
        );
      },
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
          <Button onClick={() => viewStatus(record.id)}>Book Action</Button>
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

  const viewStatus = (id: string) => {
    console.log('Status viewed of ', id);
  };
  return (
    <>
      <Table columns={columns} dataSource={data} rowKey='id' />
    </>
  );
}

export default MyBookings;
