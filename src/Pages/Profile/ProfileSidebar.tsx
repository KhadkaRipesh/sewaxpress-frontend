import { Link } from 'react-router-dom';
import styles from './ProfileSidebar.module.css';
import { Icon } from '../../Components/common/Icon';
function ProfileSideBar(props) {
  return (
    <>
      <div className={styles.usersidebar}>
        {props.activePage === 'account' ? (
          <div className={styles.s2}>
            <Icon icon='address' />
            <span>Account Settings</span>
          </div>
        ) : (
          <Link to='/profile/account' className='stylesnone'>
            <div className={styles.s1}>
              <Icon icon='address' />
              <span>Account Settings</span>
            </div>
          </Link>
        )}
        {props.activePage === 'mybookings' ? (
          <div className={styles.s2}>
            <Icon icon='mybooking' />
            <span>My Bookings</span>
          </div>
        ) : (
          <Link to='/profile/mybookings' className='stylesnone'>
            <div className={styles.s1}>
              <Icon icon='mybooking' />
              <span>My Bookings</span>
            </div>
          </Link>
        )}

        {/* for change password */}
        {props.activePage === 'change-password' ? (
          <div className={styles.s2}>
            <Icon icon='password' />
            <span>Change Password</span>
          </div>
        ) : (
          <Link to='/profile/change-password' className='stylesnone'>
            <div className={styles.s1}>
              <Icon icon='password' />
              <span>Change Password</span>
            </div>
          </Link>
        )}
      </div>
    </>
  );
}

export default ProfileSideBar;
