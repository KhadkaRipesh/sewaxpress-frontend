import { useNavigate } from 'react-router-dom';
import { getNotification } from '../../api/connection';
import { useQuery } from 'react-query';
import styles from './Notification.module.css';

function Notification() {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');

  const { data: notifications, isLoading } = useQuery('notifications', () =>
    getNotification(token)
      .then((res) => {
        return res.data.data;
      })
      .catch((error) => {
        if (error) {
          localStorage.removeItem('jwtToken');
          navigate('/login');
        }
      })
  );
  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className={styles.personal}>
        <div className={styles.title}>
          <p>Notifications</p>
          <span className={styles.count}>{notifications.length}</span>
        </div>
        <div className={styles.action}>
          <p className={styles.mark}>Mark all as Read</p>
        </div>
      </div>
      <div className={styles.content}>
        {notifications.map((notification) => {
          // Convert the ISO format string to a Date object
          const createdAtDate = new Date(notification.created_at);

          // Define months array for mapping month index to month name
          const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];

          // Get the month, day, year, hours, and minutes
          const month = months[createdAtDate.getMonth()]; // Add 1 because getMonth() returns zero-based month index
          const day = createdAtDate.getDate();
          const year = createdAtDate.getFullYear();
          let hours = createdAtDate.getHours();
          const minutes = createdAtDate.getMinutes();

          // Convert hours to 12-hour format
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // "0" hour should be "12"

          // Add leading zero to minutes if less than 10
          const formattedMinutes: string =
            minutes < 10 ? '0' + minutes : String(minutes);

          // Construct the formatted date string
          const formattedDateTime = `${month} ${day} ${year} at ${hours}:${formattedMinutes} ${ampm}`;

          return (
            <div
              className={
                notification.read === true
                  ? styles.notifi_item
                  : styles.notifi_item_unread
              }
              key={notification.id}
            >
              <img
                src='https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg'
                alt=''
              />
              <div className={styles.notifi_content}>
                <p>{notification.body}</p>
                <span className={styles.text}>{formattedDateTime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Notification;
