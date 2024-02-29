import React from 'react';
import { motion } from 'framer-motion';
import styles from './Dashboard.module.css';
import Card from '../../Components/mini-component/Card';
import { Title } from '../../Components/common/Title';

interface DashboardDataType {
  totalServices: number;
  totalCustomers: number;
  totalBookings: number;
  totalUsers: number;
}

function AdminDashboard() {
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
          <Card title={100} color='green' subtitle='Total Books' icon='Books' />
          <Card
            title={100}
            color='red'
            subtitle='Books Issued'
            icon='bookupload'
          />
          <Card
            title={10}
            color='blue'
            subtitle='Expired Books'
            icon='booksexpire'
          />
          <Card
            title={20}
            color='orange'
            subtitle='Total Students'
            icon='student'
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default AdminDashboard;
