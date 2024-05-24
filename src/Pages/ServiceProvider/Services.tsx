import { Button, Space, Table, Popconfirm, Modal } from 'antd';
import { Title } from '../../Components/common/Title';
import { motion } from 'framer-motion';
import styles from './Dashboard.module.css';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createService,
  deleteMyService,
  fetchCategories,
  fetchOwnServices,
  updateService,
} from '../../api/connection';
import { BACKEND_URL } from '../../constants/constants';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
interface ServiceData {
  image?: File | null;
  name?: string;
  description?: string;
  price?: string;
  estimated_time?: string;
  category_id?: string;
  category?: {
    category_name?: string;
  };
}

function ServiceManagement() {
  // queryclient
  const queryClient = useQueryClient();

  // New state to check if we are editing
  const [isEditing, setIsEditing] = useState(false);

  // Store the id of the service being edited
  const [editingServiceId, setEditingServiceId] = useState(null);

  // state for side modal
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setIsEditing(false); // Reset editing state when closing the modal
    setServiceData({}); // Clear form data when closing the modal
  };

  //   state for adding service
  const [serviceData, setServiceData] = useState<ServiceData>({});

  // Columns for Services
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
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
      render: (category: { category_name: any }) => category.category_name,
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
      render: (available: any) => (available ? 'true' : 'false'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size='middle'>
          <Button onClick={() => handleEditClick(record)}>Edit</Button>
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

  const handleEditClick = (record) => {
    console.log(record);
    setServiceData(record);
    setEditingServiceId(record.id);
    setIsEditing(true);
    setOpen(true);
  };

  //   fetch services
  const session = localStorage.getItem('jwtToken');
  const { data: services } = useQuery('myService', () =>
    fetchOwnServices(session)
  );
  const data = services?.data.data;

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

  // handling service data
  const handleAddService = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.type === 'file'
    ) {
      const file = event.target.files && event.target.files[0];
      setServiceData({ ...serviceData, [field]: file });
    } else {
      setServiceData({ ...serviceData, [field]: event.target.value });
    }
  };

  const addServiceMutation = useMutation(
    () => {
      setServiceData([]);
      return createService(serviceData, session);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['myService']);
        SuccessMessage('Service Added Successfully.');
      },
      onError: (error: any) => {
        ErrorMessage(error.response.data.message);
      },
    }
  );

  const updateServiceMutation = useMutation(
    () => updateService(editingServiceId!, serviceData, session),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['myService']);
        SuccessMessage('Service Updated Successfully.');
        onClose();
      },
      onError: (error: any) => {
        ErrorMessage(error.response.data.message);
      },
    }
  );

  const handleSaveService = () => {
    if (isEditing) {
      updateServiceMutation.mutate();
    } else {
      addServiceMutation.mutate();
    }
  };

  const { data: category } = useQuery('category', () => fetchCategories(1, 10));
  const datas = category?.data.data.result;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, width: '100%' }}
        animate={{ opacity: 1, width: '100%', transition: { duration: 1 } }}
      >
        <Title title='Service Management' />
        <button className={styles.addbtn} onClick={() => showDrawer()}>
          Add Service
        </button>
        {open && (
          <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            className='modalStyle'
          >
            {/* Form here */}
            <div className={styles.form}>
              <h2 className={styles.h2}>
                {isEditing ? 'Edit Service' : 'Add New Service'}
              </h2>

              <label>Service Image</label>
              <br />
              <div className={styles.textField}>
                <input
                  type='file'
                  name='image'
                  id='image'
                  onChange={(e) => handleAddService(e, 'image')}
                  required={!isEditing}
                />
              </div>

              <label>Service Name</label>
              <input
                className={styles.textField}
                type='text'
                name='name'
                id='name'
                placeholder='Enter service name'
                value={serviceData.name || ''}
                onChange={(e) => handleAddService(e, 'name')}
                required
              />

              <label>Service Description</label>
              <br />
              <input
                className={styles.textField}
                type='text'
                name='description'
                id='description'
                placeholder='Description here'
                value={serviceData.description || ''}
                onChange={(e) => handleAddService(e, 'description')}
                required
              />

              <label>Price</label>
              <input
                className={styles.textField}
                type='text'
                name='price'
                id='price'
                placeholder='Price here'
                value={serviceData.price || ''}
                onChange={(e) => handleAddService(e, 'price')}
                required
              />

              <label>Time</label>
              <input
                className={styles.textField}
                type='text'
                name='estimated_time'
                id='estimated_time'
                placeholder='Estimated time here'
                value={serviceData.estimated_time || ''}
                onChange={(e) => handleAddService(e, 'estimated_time')}
                required
              />

              <label>Category</label>
              <select
                className={styles.textField}
                name='category_id'
                id='category_id'
                value={serviceData.category_id || ''}
                onChange={(e) => handleAddService(e, 'category_id')}
                required={!isEditing}
              >
                <option value={''}>Select a Category</option>
                {datas.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <button
              className={styles.add}
              onClick={() => {
                onClose();
                handleSaveService();
              }}
            >
              {isEditing ? 'Update Service' : 'Add Service'}
            </button>
          </Modal>
        )}
        <div className='data'>
          <Table columns={columns} dataSource={data} rowKey={'id'} />
        </div>
      </motion.div>
    </>
  );
}

export default ServiceManagement;
