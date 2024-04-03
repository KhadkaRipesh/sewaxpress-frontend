import { useParams } from 'react-router-dom';
import ProfileSideBar from './ProfileSidebar';
import AccountSetting from './AccountSetting';
import styles from './Profile.module.css';
import MyBookings from './Bookings';
import ProfileNavbar from '../../Components/Nav/ProfileNavbar';
import ChangePassword from './ChangePassword';

function UserProfile() {
  const { activePage } = useParams();
  return (
    <>
      <ProfileNavbar />
      <div className='container'>
        <div className={styles.userProfile}>
          <div className={styles.left}>
            <ProfileSideBar activePage={activePage} />
          </div>
          <div className={styles.right}>
            {activePage === 'account' && <AccountSetting />}
            {activePage === 'mybookings' && <MyBookings />}
            {activePage === 'change-password' && <ChangePassword />}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
