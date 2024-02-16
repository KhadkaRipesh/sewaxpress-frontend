import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/icon/icon.png';

import styles from './Nav.module.css';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import {
  IoChatbubblesOutline,
  IoBrowsersOutline,
  IoNotificationsOutline,
} from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';

function ProfileNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // usestate hooks for search
  const [searchInput, setSearchInput] = useState('');

  // useState hook for hover state
  const [hoveredIcon, setHoveredIcon] = useState(null);

  // Function to handle icon hover
  const handleIconHover = (iconName: any) => {
    setHoveredIcon(iconName);
  };

  // Function to handle icon hover out
  const handleIconHoverOut = () => {
    setHoveredIcon(null);
  };

  // function for searching
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // Icon data
  const icons = [
    { name: 'Booking', icon: IoBrowsersOutline, style: styles.bookingHover },
    { name: 'Chat', icon: IoChatbubblesOutline, style: styles.chatHover },
    {
      name: 'Notifications',
      icon: IoNotificationsOutline,
      style: styles.notificationsHover,
    },
  ];

  // store current url on session storage
  sessionStorage.setItem('redirectUrl', location.pathname);
  const logout = () => {
    sessionStorage.removeItem('jwtToken');
    const redirectUrl = sessionStorage.getItem('redirectUrl');
    if (redirectUrl) {
      console.log(redirectUrl);
      navigate(`${redirectUrl}`);
      // Clear the stored URL after redirection
      sessionStorage.removeItem('redirectUrl');
    } else {
      // If there is no stored URL, redirect to a default page
      navigate('/');
    }
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
            {icons.map((icon, index) => (
              <div
                key={index}
                className={styles[icon.name.toLowerCase()]}
                onMouseEnter={() => handleIconHover(icon.name)}
                onMouseLeave={handleIconHoverOut}
              >
                <icon.icon className='react-icons' />
                {hoveredIcon === icon.name && (
                  <div className={icon.style}>
                    <p className={styles.icon_name}>{icon.name}</p>
                  </div>
                )}
              </div>
            ))}
            <div className={styles.profile} onClick={logout}>
              <CgProfile className='react-icons' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileNavbar;
