import { Button, Drawer, Space, Table, Popconfirm, Upload } from 'antd';
import { Title } from '../../Components/common/Title';
import { motion } from 'framer-motion';
import styles from './Dashboard.module.css';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createService,
  deleteMyService,
  fetchOwnServices,
} from '../../api/connection';
import { BACKEND_URL } from '../../constants/constants';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

function ServiceManagement() {
  // queryclient
  const queryClient = useQueryClient();
  // state for side modal
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  //   for image

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  //   state for adding service
  const [serviceData, setServiceData] = useState({});

  // Columns for Services
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => category.category_name,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Estimated Time',
      dataIndex: 'estimated_time',
      key: 'address',
    },
    {
      title: 'Availability',
      dataIndex: 'is_available',
      key: 'availability',
      render: (available) => (available ? 'true' : 'false'),
    },

    {
      title: 'Action',
      key: 'action',
      render: (record: { id: string }) => (
        <Space size='middle'>
          <Button>Edit</Button>
          <Popconfirm
            title='Delete the service?'
            onConfirm={() => confirm(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //   confirm delete
  function confirm(service_id: string) {
    deleteServiceMutation.mutate(service_id);
  }

  //   fetch services
  const session = localStorage.getItem('jwtToken');
  const { data: services } = useQuery('myService', () =>
    fetchOwnServices(session)
  );
  const data = services?.data.data.result;

  //   delete service

  const deleteServiceMutation = useMutation(
    (service_id: string) => {
      return deleteMyService(service_id, session);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['myService']);
        SuccessMessage('Service Deleted Successfully.');
      },
    }
  );

  //   for image file
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
        setServiceData({ ...serviceData, image: info.file.originFileObj });
      });
    } else {
      console.log('Error uploading file');
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // handling service data
  const handleAddService = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setServiceData({ ...serviceData, [field]: event.target.value });
    console.log(serviceData);
  };

  const addServiceMutation = useMutation(
    () => {
      console.log('hel');
      return createService(serviceData, session);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['myService']);
        SuccessMessage('Service Added Successfully.');
      },
      onError: (error) => {
        ErrorMessage(error.response.data.message);
      },
    }
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, width: '100%' }}
        animate={{ opacity: 1, width: '100%', transition: { duration: 1 } }}
      >
        <Title title='Service Management' />
        <button className={styles.addbtn} onClick={showDrawer}>
          Add Service
        </button>
        <Drawer
          title='Add new service'
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                onClick={() => {
                  onClose();
                  addServiceMutation.mutate();
                }}
                type='primary'
              >
                Submit
              </Button>
            </Space>
          }
        >
          {/* Form here */}
          <div className='form'>
            <label>Service Image</label>
            <Upload
              name='avatar'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
            <br />

            <label>Service Name</label>
            <br />
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter service name'
              onChange={(e) => handleAddService(e, 'name')}
              required
            />
            <br />

            <label>Service Description</label>
            <br />
            <input
              type='text'
              name='description'
              id='description'
              placeholder='Description here'
              onChange={(e) => handleAddService(e, 'description')}
              required
            />
            <br />

            <label>Price</label>
            <input
              type='text'
              name='price'
              id='price'
              placeholder='Price here'
              onChange={(e) => handleAddService(e, 'price')}
              required
            />
            <br />

            <label>Time</label>
            <input
              type='text'
              name='estimated_time'
              id='estimated_time'
              placeholder='Price here'
              onChange={(e) => handleAddService(e, 'estimated_time')}
              required
            />
            <br />

            <label>Category</label>
            <input
              type='text'
              name='category_id'
              id='category_id'
              placeholder='Category here'
              onChange={(e) => handleAddService(e, 'category_id')}
              required
            />
            <br />
          </div>
        </Drawer>
        <div className='data'>
          <Table columns={columns} dataSource={data} rowKey={'id'} />
        </div>
      </motion.div>
    </>
  );
}

export default ServiceManagement;
