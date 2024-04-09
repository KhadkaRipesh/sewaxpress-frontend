import { Badge, Button, Space, Table } from 'antd';
import { Title } from '../../Components/common/Title';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { fetchHubs } from '../../api/connection';
import { BACKEND_URL } from '../../constants/constants';
import moment from 'moment';

function HubManagement() {
  // Columns for Services
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'image',
      render: (image) => (
        <img
          src={`${BACKEND_URL}` + image}
          alt='Service'
          style={{ width: '65px', height: '50px' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Contact',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Approved Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => {
        let badgeStatus = 'default';

        // Determine badge status and text based on specific conditions
        if (text === 'PENDING') {
          badgeStatus = 'processing';
        } else if (text === 'ACTIVE') {
          badgeStatus = 'success';
        } else if (text === 'CLOSED') {
          badgeStatus = 'error';
        } else if (text === 'SUSPENDEF') {
          badgeStatus = 'warning';
        }

        return <Badge status={badgeStatus} text={text} />;
      },
    },
    {
      title: 'Registered Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (booking_date: moment.MomentInput) =>
        moment(booking_date).format('YYYY-MM-DD'),
    },
    {
      title: 'Owned By',
      dataIndex: 'user',
      key: 'user',
      render: (user) => user.full_name,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: { id: string }) => (
        <Space size='middle'>
          <Button>View</Button>

          <Button>Edit</Button>
        </Space>
      ),
    },
  ];

  // fetch hubs
  const session = localStorage.getItem('jwtToken');
  const { data: services } = useQuery('hubs', () => fetchHubs(session));
  const data = services?.data.data;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, width: '100%' }}
        animate={{ opacity: 1, width: '100%', transition: { duration: 1 } }}
      >
        <Title title='Hubs' />
        <div className='data'>
          <Table columns={columns} dataSource={data} rowKey={'id'} />
        </div>
      </motion.div>
    </>
  );
}

export default HubManagement;
