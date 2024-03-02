import { motion } from 'framer-motion';
import { Title } from '../../Components/common/Title';
import { Button, Space, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../constants/constants';
import axios from 'axios';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  interface DataType {
    key: string;
    name: string;
  }
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Sn.',
      dataIndex: 'sn',
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size='middle'>
          <Button>Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchCategories(1, 10);
  }, []);

  const fetchCategories = (page: number, limit: number) => {
    setCurrentPage(page);
    setPageSize(limit);
    axios
      .get(`${BACKEND_URL}/category?page=${page}&limit=${limit}`)
      .then((response) => {
        setCategories(response.data.data.result);
        setTotalCategories(response.data.data.totalCount);
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <>
      <div className='admin-container'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
        >
          <Title title='Categories' />
          <Table
            columns={columns}
            dataSource={categories}
            rowKey={'id'}
            pagination={{
              total: totalCategories,
              onChange: (page, pageSize) => {
                console.log(pageSize);
                fetchCategories(page, pageSize);
              },
            }}
          />
        </motion.div>
      </div>
    </>
  );
}

export default Categories;
