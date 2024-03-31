import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/icon/icon.png';
import avatar from '../../assets/images/avatar.png';

import styles from './Nav.module.css';
import { SetStateAction, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import {
  IoChatbubblesOutline,
  IoBrowsersOutline,
  IoNotificationsOutline,
} from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import Notification from '../Notifications/Notification';
// import  avatar  from '../../assets/images/avatar.png';
function ProfileNavbar() {
  const navigate = useNavigate();

  // usestate hooks for search
  const [searchInput, setSearchInput] = useState('');

  // for dropdown
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // function for searching
  const handleChange = (e: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const clickNav = (item: string) => {
    navigate(`/${item}`);
  };

  function DropdownItems(props) {
    return (
      <li className={styles.li_items} onClick={props.onClick}>
        <div className='icon'>{props.icon}</div>
        <div className='text'>{props.text}</div>
      </li>
    );
  }

  // store current url on session storage
  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    window.location.reload();
  };
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.profileNavRow}>
          <div className={styles.icon}>
            <NavLink to={'/'}>
              <img className={styles.logo} src={logo} alt='logo' />
            </NavLink>
          </div>
          <div className={styles.topCenter}>
            <div className={styles.searchContainer}>
              <CiSearch />
              <input
                type='text'
                id={styles.search}
                placeholder='Search anything here...'
                onChange={handleChange}
                value={searchInput}
              />
            </div>
          </div>
          <div className={styles.topRight}>
            <div className={styles.booking}>
              <IoBrowsersOutline className='react-icons' />
              <div className={styles.bookingHover}>
                <p className={styles.icon_name}>Bookings</p>
              </div>
            </div>
            <div className={styles.chat} onClick={() => clickNav('messages')}>
              <IoChatbubblesOutline className='react-icons' />
              <div className={styles.chatHover}>
                <p className={styles.icon_name}>Chat</p>
              </div>
            </div>
            <div
              className={styles.notifications}
              onClick={() => {
                setShowNotification(!showNotification);
              }}
            >
              <IoNotificationsOutline className='react-icons' />
              <div className={styles.notificationsHover}>
                <p className={styles.icon_name}>Notifications</p>
              </div>
              {showNotification && (
                <div className={styles.notification_dropdown}>
                  <Notification />
                </div>
              )}
            </div>
            <div
              className={styles.profile}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <CgProfile className='react-icons' />
              {open && (
                <div className={styles.dropdown_menu}>
                  <div className={styles.personal}>
                    <div className='pp'>
                      <img
                        src={avatar}
                        alt=''
                        style={{ height: 55, width: 55 }}
                      />
                    </div>
                    <div className='pn'>{'John Doe'}</div>
                  </div>
                  <ul>
                    <NavLink to='/'>
                      <DropdownItems
                        icon={<CgProfile className={styles.dropdown_icon} />}
                        text='Account Settings'
                      />
                    </NavLink>
                    <NavLink to='/'>
                      <DropdownItems
                        onClick={logout}
                        icon={<FiLogOut className={styles.dropdown_icon} />}
                        text='Logout'
                      />
                    </NavLink>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileNavbar;
