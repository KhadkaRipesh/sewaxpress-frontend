import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/icon/icon.png';
import avatar from '../../assets/images/avatar.png';

import styles from './Nav.module.css';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import {
  IoChatbubblesOutline,
  IoBrowsersOutline,
  IoNotificationsOutline,
} from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
// import  avatar  from '../../assets/images/avatar.png';
function ProfileNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // usestate hooks for search
  const [searchInput, setSearchInput] = useState('');

  // useState hook for hover state
  const [hoveredIcon, setHoveredIcon] = useState(null);

  // for dropdown
  const [open, setOpen] = useState(false);

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

  function DropdownItems(props) {
    return (
      <li className={styles.li_items} onClick={props.onClick}>
        <div className='icon'>{props.icon}</div>
        <div className='text'>{props.text}</div>
      </li>
    );
  }

  // store current url on session storage
  sessionStorage.setItem('redirectUrl', location.pathname);
  const logout = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('role');
    window.location.reload();
    navigate('/');
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
