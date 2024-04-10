import {
  Badge,
  Button,
  Dropdown,
  MenuProps,
  Space,
  Table,
  Typography,
} from 'antd';
import { Title } from '../../Components/common/Title';
import { motion } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchHubs, updateHubStatus } from '../../api/connection';
import { BACKEND_URL } from '../../constants/constants';
import moment from 'moment';
import { DownOutlined } from '@ant-design/icons';
import { ErrorMessage } from '../../utils/notify';

function HubManagement() {
  const queryClient = useQueryClient();

  // fetch hubs
  const session = localStorage.getItem('jwtToken');
  const { data: services } = useQuery('hubs', () => fetchHubs(session));
  const data = services?.data.data;

  // function to edit the status details
  const editHubStatusMutation = useMutation(
    (params: { status: string; hub_id: string }) => {
      const data = {
        status: params.status,
      };
      return updateHubStatus(params.hub_id, data, session)
        .then((res) => {
          console.log(res.data);
          queryClient.invalidateQueries(['hubs']);
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
      render: (text: string, record: { id: string }) => {
        let badgeStatus = 'default';

        // Determine badge status and text based on specific conditions
        if (text === 'PENDING') {
          badgeStatus = 'processing';
        } else if (text === 'ACTIVE') {
          badgeStatus = 'success';
        } else if (text === 'CLOSED') {
          badgeStatus = 'error';
        } else if (text === 'SUSPENDED') {
          badgeStatus = 'warning';
        }

        const items: MenuProps['items'] = [
          {
            key: '1',
            label: 'PENDING',
          },
          {
            key: '2',
            label: 'ACTIVE',
          },
          {
            key: '3',
            label: 'CLOSED',
          },
        ];

        const handleStatusChange = async (selectedItem: any, record: any) => {
          try {
            // Call editHubStatusMutation function here
            await editHubStatusMutation.mutateAsync({
              status: selectedItem.label,
              hub_id: record.id,
            });
          } catch (error) {
            console.error('Error updating hub status:', error);
          }
        };

        return (
          <>
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ['3'],
                onClick: ({ key }: { key: string }) =>
                  handleStatusChange(items[Number(key) - 1], record),
              }}
            >
              <Typography.Link>
                <Space>
                  <Badge status={badgeStatus} text={text} />
                  <DownOutlined />
                </Space>
              </Typography.Link>
            </Dropdown>
          </>
        );
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
        </Space>
      ),
    },
  ];

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
