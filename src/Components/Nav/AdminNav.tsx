import logo from '../../assets/icon/icon.png';
import styles from './AdminNav.module.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import { Icon } from '../common/Icon';

const routes = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
  },
  {
    path: '/admin/booking',
    name: 'Bookings',
    icon: 'booking',
  },
  {
    path: '/admin/category',
    name: 'Category',
    icon: 'categoryy',
  },
  {
    path: '/admin/user',
    name: 'Users',
    icon: 'users',
  },
  {
    path: '',
    name: 'Logout',
    icon: 'logout',
  },
];

export default function AdminNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('role');
    navigate('/');
    window.location.reload();
  };

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className={styles.nav_container}>
      <motion.div
        animate={{ width: isOpen ? '250px' : '70px' }}
        className={styles.sidebar}
      >
        <div>
          <div className={styles.top_container}>
            <div className={styles.bars}>
              <FaBars onClick={toggle} />
            </div>
            {isOpen && <img src={logo} className={styles.logo} alt='logo' />}
          </div>

          <section className={styles.routes}>
            {routes.map((route, index) => {
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className={({ isActive }) => {
                    let str = `${styles.Navitems}`;
                    if (isActive) str += ` ${styles.NavItemsActive}`;
                    return str;
                  }}
                  onClick={route.name === 'Logout' ? handleLogout : undefined}
                >
                  <div className={styles.icon}>
                    <Icon icon={route.icon}></Icon>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div className={styles.link_text}>
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
          <div className={styles.top_container}></div>
        </div>
      </motion.div>
    </div>
  );
}