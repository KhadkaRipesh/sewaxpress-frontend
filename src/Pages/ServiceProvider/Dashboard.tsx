import styles from './Dashboard.module.css';
import { motion } from 'framer-motion';
import { Title } from '../../Components/common/Title';
import Card from '../../Components/mini-component/Card';
function ServiceProviderDashboard() {
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
            title={20}
            color='green'
            subtitle='Service Offered'
            icon='category'
          />
          <Card
            title={10}
            color='blue'
            subtitle='Upcomming Appointment'
            icon='hubs'
          />
          <Card
            title={5}
            color='red'
            subtitle='Total Booking'
            icon='services'
          />
          <Card
            title={12}
            color='orange'
            subtitle='Completed Services'
            icon='services'
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default ServiceProviderDashboard;
