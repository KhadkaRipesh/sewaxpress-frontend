import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Dashboard.module.css';
import Card from '../../Components/mini-component/Card';
import { Title } from '../../Components/common/Title';
import axios from 'axios';
import { BACKEND_URL } from '../../constants/constants';

interface DashboardDataType {
  total_categories: number;
  total_hubs: number;
  booked_service: number;
  totalUsers: number;
}

function AdminDashboard() {
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/dashboard`)
      .then((response) => setData(response.data.data))
      .catch((error) => console.log(error.response));
  }, []);

  const [data, setData] = React.useState<DashboardDataType | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <Title title='Dashboard' />
        <motion.div
          className={styles.cards}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
          exit={{ opacity: 0 }}
        >
          <Card
            title={data?.total_categories}
            color='green'
            subtitle='Total Categories'
            icon='category'
          />
          <Card
            title={data?.total_hubs}
            color='blue'
            subtitle='Total Hubs'
            icon='hubs'
          />
          <Card
            title={data?.booked_service}
            color='red'
            subtitle='Booked Services'
            icon='services'
          />
          <Card
            title={data?.totalUsers}
            color='orange'
            subtitle='Total Users'
            icon='user'
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default AdminDashboard;
