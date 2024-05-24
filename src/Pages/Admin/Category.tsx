/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { Title } from '../../Components/common/Title';
import { Button, Modal, Popconfirm, Space, Table, TableProps } from 'antd';
import { useState } from 'react';
import { BACKEND_URL } from '../../constants/constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ErrorMessage, SuccessMessage } from '../../utils/notify';
import {
  createCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
  fetchCategoryById,
} from '../../api/connection';
import styles from './Dashboard.module.css';

function Categories() {
  type FormData = {
    category_name: string;
    image: File | null;
  };
  const queryClient = useQueryClient();
  // const [categories, setCategories] = useState([]);
  const [totalCategories] = useState(1);
  const [currentPage] = useState(1);
  const [pageSize] = useState(10);

  // state add function for modal
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const handleCancel = () => {
    setModalOpen(false);
    setEditModalOpen(false);
  };

  // state add function for modal
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const openEditModal = () => {
    setEditModalOpen(true);
  };
  const [editId, setEditId] = useState('');

  const [formData, setFormData] = useState<FormData>({
    category_name: '',
    image: null,
  });

  const handleFormDataChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (event.target.type === 'file') {
      const file = event.target.files && event.target.files[0];
      setFormData({ ...formData, [field]: file });
    } else {
      setFormData({ ...formData, [field]: event.target.value });
    }
  };

  interface DataType {
    key: string;
    name: string;
  }
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Sn.',
      dataIndex: 'sn',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img
          src={`${BACKEND_URL}` + image}
          alt='Category'
          style={{ width: '65px', height: '50px' }}
        />
      ),
    },
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: { id: string }) => (
        <Space size='middle'>
          <Button
            onClick={() => {
              displayDataonLabel(record.id);
              openEditModal();
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title='Delete the category?'
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

  async function displayDataonLabel(id: string) {
    setEditId(id);
    const data = await fetchCategoryById(id)
      .then((res) => res.data)
      .catch((e) => console.log(e));

    setFormData({
      category_name: data.data.category_name,
      image: null,
    });
  }

  // add category
  const addCategoryMutation = useMutation(
    () => {
      setFormData({
        category_name: '',
        image: null,
      });
      return createCategory(formData, session);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['category']);
        SuccessMessage('Category Added Successfully.');
      },
      onError: (error: any) => {
        ErrorMessage(error.response.data.message);
      },
    }
  );

  // edit category
  const editCategoryMutation = useMutation(
    () => {
      const id = editId;
      setFormData({
        category_name: '',
        image: null,
      });
      return editCategory(id, formData, session);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['category']);
        SuccessMessage('Category Edited Successfully.');
      },
      onError: (error: any) => {
        ErrorMessage(error.response.data.message);
      },
    }
  );

  //   confirm delete
  function confirm(service_id: string) {
    deleteCategoryMutation.mutate(service_id);
  }

  //   delete service
  const session = localStorage.getItem('jwtToken');
  const deleteCategoryMutation = useMutation(
    (category_id: string) => {
      return deleteCategory(category_id, session);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['category']);
        SuccessMessage('Category Deleted Successfully.');
      },
    }
  );

  const { data: category } = useQuery('category', () => fetchCategories(1, 10));
  const data = category?.data.data.result;

  return (
    <>
      <div className='admin-container'>
        <motion.div
          initial={{ opacity: 0, width: '100%' }}
          animate={{ opacity: 1, width: '100%', transition: { duration: 1 } }}
        >
          <Title title='Categories' />
          <button
            className={styles.addbtn}
            onClick={() => {
              openModal();
            }}
          >
            Add Category
          </button>
          {isModalOpen && (
            <Modal
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              className='modalStyle'
            >
              <>
                <div className={styles.form}>
                  <h2 className={styles.h2}>Add New Category</h2>
                  <label>Category Name</label>
                  <br />
                  <input
                    className={styles.textfield}
                    type='text'
                    name='category_name'
                    id='category_name'
                    value={formData.category_name}
                    placeholder='Enter category name'
                    onChange={(e) => handleFormDataChange(e, 'category_name')}
                    required
                  />
                  <br />

                  <label>Category Image</label>
                  <div className={styles.textField}>
                    <input
                      className={styles.textfield}
                      type='file'
                      name='image'
                      id='image'
                      onChange={(e) => handleFormDataChange(e, 'image')}
                      required
                    />
                  </div>
                  <button
                    className={styles.create}
                    onClick={() => {
                      handleCancel();
                      addCategoryMutation.mutate();
                    }}
                  >
                    Add Category
                  </button>
                </div>
              </>
            </Modal>
          )}
          {/* for editing category */}
          {isEditModalOpen && (
            <Modal
              open={isEditModalOpen}
              onCancel={handleCancel}
              footer={null}
              className='modalStyle'
            >
              <>
                <div className={styles.form}>
                  <h2 className={styles.h2}>Edit Category</h2>
                  <label>Category Name</label>
                  <br />
                  <input
                    className={styles.textfield}
                    type='text'
                    name='category_name'
                    id='category_name'
                    value={formData.category_name}
                    placeholder='Enter category name'
                    onChange={(e) => handleFormDataChange(e, 'category_name')}
                    required
                  />
                  <br />

                  <label>Category Image</label>
                  <div className={styles.textField}>
                    <input
                      className={styles.textfield}
                      type='file'
                      name='image'
                      id='image'
                      onChange={(e) => handleFormDataChange(e, 'image')}
                      required
                    />
                  </div>
                  <button
                    className={styles.create}
                    onClick={() => {
                      handleCancel();
                      editCategoryMutation.mutate();
                    }}
                  >
                    Edit Category
                  </button>
                </div>
              </>
            </Modal>
          )}
          <div className='data'>
            <Table
              columns={columns}
              dataSource={data}
              rowKey={'id'}
              pagination={{
                total: totalCategories,
                onChange: (page, pageSize) => {
                  console.log(pageSize);
                  fetchCategories(page, pageSize);
                },
              }}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Categories;
