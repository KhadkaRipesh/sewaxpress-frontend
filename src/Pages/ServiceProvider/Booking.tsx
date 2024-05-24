import {
  Badge,
  Button,
  Dropdown,
  MenuProps,
  Space,
  Table,
  Typography,
} from 'antd';
import {
  BookingQuery,
  fetchBookingOfServiceProvider,
  updateBookStatus,
} from '../../api/connection';
import moment from 'moment';
import { motion } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Title } from '../../Components/common/Title';
import { ErrorMessage } from '../../utils/notify';

function Booking() {
  const queryClient = useQueryClient();

  const query: BookingQuery = {
    // book_status: 'BOOKING_PLACED',
    // date: 'LAST_30_DAYS',
    // start_date: null,
    // end_date: null,
  };

  // function to edit the status of booking by service provider
  const editBookStatusMutation = useMutation(
    (params: { book_status: string; book_id: string }) => {
      const data = {
        book_status: params.book_status,
      };
      return updateBookStatus(params.book_id, data, session)
        .then((res) => {
          console.log(res.data);
          queryClient.invalidateQueries(['mybook']);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            ErrorMessage('Please Login to Continue');
          } else {
            console.log(err.response.data.message);
          }
        });
    }
  );

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
      render: (text: string, record: { id: string }) => {
        let badgeStatus = 'default';

        // Determine badge status and text based on specific conditions
        if (text === 'BOOKING_PLACED') {
          badgeStatus = 'processing';
        } else if (text === 'BOOKING_CONFIRMED') {
          badgeStatus = 'success';
        } else if (text === 'BOOKING_CANCELLED') {
          badgeStatus = 'error';
        }

        const items: MenuProps['items'] = [
          {
            key: '1',
            label: 'BOOKING_CANCELLED',
          },
          {
            key: '2',
            label: 'BOOKING_PROCESSING',
          },
          {
            key: '3',
            label: 'READYFORSERVICE',
          },
        ];

        const handleStatusChange = async (selectedItem: any, record: any) => {
          try {
            // Call editHubStatusMutation function here
            await editBookStatusMutation.mutateAsync({
              book_status: selectedItem.label,
              book_id: record.id,
            });
          } catch (error) {
            console.error('Error updating book status:', error);
          }
        };

        return (
          <>
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ['2'],
                onClick: ({ key }: { key: string }) =>
                  handleStatusChange(items[Number(key) - 1], record),
              }}
            >
              <Typography.Link>
                <Space>
                  <Badge
                    status={
                      badgeStatus as
                        | 'success'
                        | 'processing'
                        | 'default'
                        | 'error'
                        | 'warning'
                    }
                    text={text}
                  />
                </Space>
              </Typography.Link>
            </Dropdown>
          </>
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
      title: 'Booked By',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer: { id: string; full_name: string }) =>
        customer.full_name,
    },
    {
      title: 'Contact',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer: { phone_number: string }) => customer.phone_number,
    },
    {
      title: 'Booked Address',
      dataIndex: 'booking_address',
      key: 'booking_address',
    },

    {
      title: 'Total Charge',
      dataIndex: 'grand_total',
      key: 'price',
      render: (grand_total: string) => `Rs. ${grand_total}`,
    },
  ];

  //   fetch my bookings
  const session = localStorage.getItem('jwtToken');
  const { data: services } = useQuery('mybook', () =>
    fetchBookingOfServiceProvider(session, query)
      .then((res) => res)
      .catch((e) => console.log(e.response))
  );
  const data = services?.data.data;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, width: '100%' }}
        animate={{ opacity: 1, width: '100%', transition: { duration: 1 } }}
      >
        <Title title='Booking Management' />
        <div className='data'>
          <Table columns={columns} dataSource={data} rowKey='id' />
        </div>
      </motion.div>
    </>
  );
}

export default Booking;
